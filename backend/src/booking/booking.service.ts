import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import {
  ActivityAction,
  BookingStatus,
  CarStatus,
  Prisma,
} from "../../generated/prisma/client";

import { BookingRepository } from "./booking.repository";

import { CreateBookingDto } from "./dto/create-booking.dto";

import {
  calculateBookingPricing,
} from "./utils/booking-pricing.util";

import {
  generateBookingReference,
} from "./utils/booking-reference.util";

import { PaymentService } from "./payment/payment.services";

import {
  NotificationService,
} from "../engagement/notification/notification.service";

import {
  ActivityService,
} from "../engagement/activity/activity.service";

import {
  ReviewService,
} from "../engagement/review/review.service";

@Injectable()
export class BookingService {
  private readonly logger =
    new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,

    private readonly paymentService: PaymentService,

    private readonly configService: ConfigService,

    private readonly notificationService: NotificationService,

    private readonly activityService: ActivityService,

    private readonly reviewService: ReviewService,
  ) {}

  async createBooking(
    renterId: string,
    dto: CreateBookingDto,
  ) {
    const pickupAt =
      new Date(dto.pickupAt!);

    const dropOffAt =
      new Date(dto.dropOffAt!);

    this.validateDates(
      pickupAt,
      dropOffAt,
    );

    const days =
      this.calculateRentalDays(
        pickupAt,
        dropOffAt,
      );

    const maxRentalDays =
      this.configService.get<number>(
        "MAX_RENTAL_DAYS",
        30,
      );

    if (days > maxRentalDays) {
      throw new ConflictException(
        `Rental duration cannot exceed ${maxRentalDays} days`,
      );
    }

    if (!dto.carId) {
      throw new ConflictException(
        "Car ID is required",
      );
    }

    const car =
      await this.bookingRepository
        .findCarForBooking(
          dto.carId,
        );

    if (!car) {
      throw new NotFoundException(
        "Car not found",
      );
    }

    if (
      car.status !==
      CarStatus.APPROVED
    ) {
      throw new ConflictException(
        "This car is not available for booking",
      );
    }

    /*
     * An owner cannot rent their own car.
     */
    if (
      car.ownerId === renterId
    ) {
      throw new ForbiddenException(
        "You cannot book your own car",
      );
    }

    /*
     * Remove duplicate add-on IDs before
     * querying the database.
     */
    const addOnIds = [
      ...new Set(
        dto.addOnIds ?? [],
      ),
    ];

    const addOns =
      await this.bookingRepository
        .findActiveAddOns(
          addOnIds,
        );

    if (
      addOns.length !==
      addOnIds.length
    ) {
      throw new ConflictException(
        "One or more selected add-ons are invalid or inactive",
      );
    }

    const taxRate =
      this.configService.get<number>(
        "TAX_RATE",
        0.18,
      );

    /*
     * Pricing is always calculated on the server.
     */
    const pricing =
      calculateBookingPricing({
        carPricePerDay:
          car.pricePerDay,

        days,

        addOnPricesPerDay:
          addOns.map(
            (addOn) =>
              addOn.pricePerDay,
          ),

        taxRate,
      });

    /*
     * Payment uses the server-calculated amount.
     */
    const payment =
      await this.paymentService
        .processPayment(
          pricing.totalAmount.toNumber(),
        );

    if (!payment.success) {
      throw new ConflictException(
        "Payment failed",
      );
    }

    const referenceNumber =
      generateBookingReference();

    const bookingData:
      Prisma.BookingCreateInput = {
      referenceNumber,

      pickupAt,

      dropOffAt,

      days,

      carPricePerDay:
        car.pricePerDay,

      addOnsTotal:
        pricing.addOnsTotal,

      subtotal:
        pricing.subtotal,

      tax:
        pricing.tax,

      totalAmount:
        pricing.totalAmount,

      status:
        BookingStatus.CONFIRMED,

      car: {
        connect: {
          id: car.id,
        },
      },

      renter: {
        connect: {
          id: renterId,
        },
      },

      bookingAddOns: {
        create: addOns.map(
          (addOn) => ({
            addOn: {
              connect: {
                id: addOn.id,
              },
            },

            pricePerDaySnapshot:
              addOn.pricePerDay,
          }),
        ),
      },
    };

    /*
     * The availability check is performed again
     * inside a transaction protected by a
     * car-specific PostgreSQL advisory lock.
     */
    const booking =
      await this.bookingRepository
        .createBookingWithLock(
          car.id,
          bookingData,
          pickupAt,
          dropOffAt,
        );

    if (!booking) {
      /*
       * A real payment provider would be refunded here.
       *
       * The current mock provider has no real
       * financial side effect.
       */
      throw new ConflictException(
        "Car is no longer available for the selected dates",
      );
    }

    /*
     * Booking has successfully committed.
     *
     * Notifications and activity logs are intentionally
     * outside the booking transaction. They are secondary
     * side effects and must not invalidate a successful booking.
     */
    await this.handleBookingCreatedSideEffects({
      bookingId: booking.id,
      referenceNumber:
        booking.referenceNumber,
      renterId,
      ownerId: car.ownerId,
      carName:
        `${car.make} ${car.model}`,
      pickupAt,
      dropOffAt,
    });

    return {
      message:
        "Booking created successfully",

      payment: {
        status: "SUCCESS",

        transactionId:
          payment.transactionId,
      },

      booking,
    };
  }

  async getUserBookings(
    renterId: string,
  ) {
    return this.bookingRepository
      .findUserBookings(
        renterId,
      );
  }

  async getBooking(
    bookingId: string,
    userId: string,
  ) {
    const booking =
      await this.bookingRepository
        .findByIdOrThrow(
          bookingId,
        );

    this.ensureBookingAccess(
      booking,
      userId,
    );

    return booking;
  }

  async cancelBooking(
    bookingId: string,
    renterId: string,
  ) {
    const booking =
      await this.bookingRepository
        .findByIdOrThrow(
          bookingId,
        );

    /*
     * Only the renter who made the booking
     * can cancel it.
     */
    if (
      booking.renterId !==
      renterId
    ) {
      throw new ForbiddenException(
        "You can only cancel your own bookings",
      );
    }

    if (
      booking.status !==
      BookingStatus.CONFIRMED
    ) {
      throw new ConflictException(
        "Only confirmed bookings can be cancelled",
      );
    }

    const cancellationWindowHours =
      this.configService.get<number>(
        "CANCELLATION_WINDOW_HOURS",
        24,
      );

    const millisecondsUntilPickup =
      booking.pickupAt.getTime() -
      Date.now();

    const hoursUntilPickup =
      millisecondsUntilPickup /
      (1000 * 60 * 60);

    if (
      hoursUntilPickup <
      cancellationWindowHours
    ) {
      throw new ConflictException(
        `Booking can only be cancelled at least ${cancellationWindowHours} hours before pickup`,
      );
    }

    const cancelledBooking =
      await this.bookingRepository
        .cancelBooking(
          bookingId,
        );

    /*
     * Cancellation succeeded.
     * Notify both parties and create an audit log.
     */
    await this.handleBookingCancelledSideEffects({
      bookingId:
        cancelledBooking.id,

      referenceNumber:
        booking.referenceNumber,

      renterId:
        booking.renterId,

      ownerId:
        booking.car.ownerId,

      cancelledBy:
        renterId,
    });

    return {
      message:
        "Booking cancelled successfully",

      booking:
        cancelledBooking,
    };
  }

  async getOwnerBookings(
    ownerId: string,
  ) {
    return this.bookingRepository
      .findOwnerBookings(
        ownerId,
      );
  }

  /**
   * PDF spec (section 11): owners should be able to see
   * how their own fleet is performing — revenue and
   * utilisation per car, plus average rating per car.
   */
  async getOwnerDashboard(
    ownerId: string,
  ) {
    const bookings =
      await this.bookingRepository
        .findOwnerBookingsForDashboard(
          ownerId,
        );

    const byCar = new Map<
      string,
      {
        carId: string;
        make: string;
        model: string;
        totalRevenue: number;
        bookingCount: number;
      }
    >();

    const byCarMonth = new Map<
      string,
      {
        carId: string;
        make: string;
        model: string;
        month: string;
        bookingCount: number;
      }
    >();

    let totalRevenue = 0;

    for (const booking of bookings) {
      const amount =
        booking.totalAmount.toNumber();

      totalRevenue += amount;

      const existingCar =
        byCar.get(booking.carId);

      if (existingCar) {
        existingCar.totalRevenue +=
          amount;
        existingCar.bookingCount += 1;
      } else {
        byCar.set(booking.carId, {
          carId: booking.carId,
          make: booking.car.make,
          model: booking.car.model,
          totalRevenue: amount,
          bookingCount: 1,
        });
      }

      const month =
        booking.pickupAt
          .toISOString()
          .slice(0, 7);

      const monthKey = `${booking.carId}:${month}`;

      const existingMonth =
        byCarMonth.get(monthKey);

      if (existingMonth) {
        existingMonth.bookingCount += 1;
      } else {
        byCarMonth.set(monthKey, {
          carId: booking.carId,
          make: booking.car.make,
          model: booking.car.model,
          month,
          bookingCount: 1,
        });
      }
    }

    const carIds = [...byCar.keys()];

    const ratings =
      await this.reviewService
        .getAverageRatingsForCars(
          carIds,
        );

    const ratingsByCarId = new Map(
      ratings.map((rating) => [
        rating.carId,
        rating,
      ]),
    );

    const revenueByCar = [...byCar.values()]
      .sort(
        (a, b) =>
          b.totalRevenue -
          a.totalRevenue,
      )
      .map((car) => ({
        ...car,
        averageRating:
          ratingsByCarId.get(car.carId)
            ?.averageRating ?? null,
        reviewCount:
          ratingsByCarId.get(car.carId)
            ?.reviewCount ?? 0,
      }));

    const monthlyUtilization = [
      ...byCarMonth.values(),
    ].sort((a, b) =>
      a.month === b.month
        ? a.make.localeCompare(b.make)
        : a.month.localeCompare(
            b.month,
          ),
    );

    return {
      totalRevenue,
      totalBookings: bookings.length,
      revenueByCar,
      monthlyUtilization,
    };
  }

  async getOwnerBooking(
    bookingId: string,
    ownerId: string,
  ) {
    const booking =
      await this.bookingRepository
        .findOwnerBookingById(
          bookingId,
          ownerId,
        );

    if (!booking) {
      throw new NotFoundException(
        "Booking not found",
      );
    }

    return booking;
  }

  async getAdminBookings() {
    return this.bookingRepository
      .findAllForAdmin();
  }

  async getAdminBooking(
    bookingId: string,
  ) {
    /*
     * findByIdOrThrow already throws 404.
     */
    return this.bookingRepository
      .findByIdOrThrow(
        bookingId,
      );
  }

  async cancelBookingByAdmin(
    bookingId: string,
  ) {
    const booking =
      await this.bookingRepository
        .findByIdOrThrow(
          bookingId,
        );

    if (
      booking.status ===
      BookingStatus.CANCELLED
    ) {
      throw new ConflictException(
        "Booking is already cancelled",
      );
    }

    if (
      booking.status ===
      BookingStatus.COMPLETED
    ) {
      throw new ConflictException(
        "Completed booking cannot be cancelled",
      );
    }

    const cancelledBooking =
      await this.bookingRepository
        .cancelBookingByAdmin(
          bookingId,
        );

    await this.handleBookingCancelledSideEffects({
      bookingId:
        cancelledBooking.id,

      referenceNumber:
        booking.referenceNumber,

      renterId:
        booking.renterId,

      ownerId:
        booking.car.ownerId,

      cancelledBy:
        "ADMIN",
    });

    return {
      message:
        "Booking cancelled successfully",

      booking:
        cancelledBooking,
    };
  }

  private async handleBookingCreatedSideEffects(
    data: {
      bookingId: string;
      referenceNumber: string;
      renterId: string;
      ownerId: string;
      carName: string;
      pickupAt: Date;
      dropOffAt: Date;
    },
  ) {
    try {
      await Promise.all([
        this.notificationService
          .createNotification({
            userId: data.renterId,

            title:
              "Booking confirmed",

            message:
              `Your booking ${data.referenceNumber} for ${data.carName} has been confirmed.`,
          }),

        this.notificationService
          .createNotification({
            userId: data.ownerId,

            title:
              "New booking received",

            message:
              `Your car ${data.carName} has been booked. Booking reference: ${data.referenceNumber}.`,
          }),

        this.activityService
          .createActivity({
            userId: data.renterId,

            action:
              ActivityAction.CREATE,

            entity: "BOOKING",

            entityId:
              data.bookingId,

            details: {
              referenceNumber:
                data.referenceNumber,

              carName:
                data.carName,

              pickupAt:
                data.pickupAt.toISOString(),

              dropOffAt:
                data.dropOffAt.toISOString(),
            },
          }),
      ]);
    } catch (error) {
      this.logger.error(
        "Booking side effects failed",
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }

  private async handleBookingCancelledSideEffects(
    data: {
      bookingId: string;
      referenceNumber: string;
      renterId: string;
      ownerId: string;
      cancelledBy: string;
    },
  ) {
    try {
      await Promise.all([
        this.notificationService
          .createNotification({
            userId: data.renterId,

            title:
              "Booking cancelled",

            message:
              `Your booking ${data.referenceNumber} has been cancelled.`,
          }),

        this.notificationService
          .createNotification({
            userId: data.ownerId,

            title:
              "Booking cancelled",

            message:
              `Booking ${data.referenceNumber} for your car has been cancelled.`,
          }),

        this.activityService
          .createActivity({
            action:
              ActivityAction.CANCEL,

            entity: "BOOKING",

            entityId:
              data.bookingId,

            details: {
              referenceNumber:
                data.referenceNumber,

              cancelledBy:
                data.cancelledBy,
            },
          }),
      ]);
    } catch (error) {
      this.logger.error(
        "Booking cancellation side effects failed",
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }

  private validateDates(
    pickupAt: Date,
    dropOffAt: Date,
  ) {
    if (
      Number.isNaN(
        pickupAt.getTime(),
      ) ||
      Number.isNaN(
        dropOffAt.getTime(),
      )
    ) {
      throw new ConflictException(
        "Invalid booking dates",
      );
    }

    if (
      pickupAt.getTime() <=
      Date.now()
    ) {
      throw new ConflictException(
        "Pickup time must be in the future",
      );
    }

    if (
      dropOffAt.getTime() <=
      pickupAt.getTime()
    ) {
      throw new ConflictException(
        "Drop-off time must be after pickup time",
      );
    }
  }

  private calculateRentalDays(
    pickupAt: Date,
    dropOffAt: Date,
  ) {
    const durationMs =
      dropOffAt.getTime() -
      pickupAt.getTime();

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    return Math.max(
      1,
      Math.ceil(
        durationMs /
          millisecondsPerDay,
      ),
    );
  }

  private ensureBookingAccess(
    booking: {
      renterId: string;

      car: {
        ownerId: string;
      };
    },

    userId: string,
  ) {
    const isRenter =
      booking.renterId ===
      userId;

    const isOwner =
      booking.car.ownerId ===
      userId;

    if (
      !isRenter &&
      !isOwner
    ) {
      throw new ForbiddenException(
        "You do not have access to this booking",
      );
    }
  }
}