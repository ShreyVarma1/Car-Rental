import {
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";

import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  BookingStatus,
  CarStatus,
  Prisma,
} from "../../generated/prisma/client";

import { BookingService } from "./booking.service";

describe("BookingService", () => {
  let service: BookingService;

  const bookingRepository = {
    findCarForBooking: jest.fn<
      () => Promise<{
        id: string;
        ownerId: string;
        status: CarStatus;
        pricePerDay: Prisma.Decimal;
      } | null>
    >(),

    findActiveAddOns: jest.fn<
      () => Promise<
        Array<{
          id: string;
          name: string;
          pricePerDay: Prisma.Decimal;
          isActive: boolean;
        }>
      >
    >(),

    createBookingWithLock: jest.fn<
      (
        carId: string,
        bookingData: unknown,
        pickupAt: Date,
        dropOffAt: Date,
      ) => Promise<{
        id: string;
        referenceNumber: string;
        totalAmount: Prisma.Decimal;
      } | null>
    >(),

    findUserBookings: jest.fn(),

    findByIdOrThrow: jest.fn<
      () => Promise<{
        id: string;
        renterId: string;
        pickupAt: Date;
        status: BookingStatus;
      }>
    >(),

    cancelBooking: jest.fn(),
  };

  const paymentService = {
    processPayment: jest.fn<
      (
        amount: number,
      ) => Promise<{
        success: boolean;
        transactionId: string;
      }>
    >(),
  };

  const configService = {
    get: jest.fn(),
  };

  const notificationService = {
    createNotification: jest.fn<() => Promise<void>>(),
    sendBookingNotification: jest.fn<() => Promise<void>>(),
  };

  const activityService = {
    createActivity: jest.fn<() => Promise<void>>(),
  };

  const reviewService = {
    getAverageRatingsForCars: jest.fn<() => Promise<any[]>>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    paymentService.processPayment.mockResolvedValue({
      success: true,
      transactionId: "MOCK-123",
    });

    notificationService.createNotification.mockResolvedValue(
      undefined,
    );
    notificationService.sendBookingNotification.mockResolvedValue(
      undefined,
    );
    activityService.createActivity.mockResolvedValue(
      undefined,
    );

    reviewService.getAverageRatingsForCars.mockResolvedValue([]);

    service = new BookingService(
      bookingRepository as any,
      paymentService as any,
      configService as any,
      notificationService as any,
      activityService as any,
      reviewService as any,
    );

    configService.get.mockImplementation(
      (...args: unknown[]) => {
        const [key, defaultValue] = args as [
          string,
          unknown,
        ];

        const values: Record<string, unknown> = {
          MAX_RENTAL_DAYS: 30,
          CANCELLATION_WINDOW_HOURS: 24,
          TAX_RATE: 0.18,
        };

        return (
          values[key] ??
          defaultValue
        );
      },
    );
  });

  describe("createBooking", () => {
    it("should reject a pickup time in the past", async () => {
      const dto = {
        carId: "car-1",
        pickupAt:
          "2020-01-01T10:00:00Z",
        dropOffAt:
          "2020-01-03T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        ConflictException,
      );

      expect(
        bookingRepository.findCarForBooking,
      ).not.toHaveBeenCalled();
    });

    it("should reject when drop-off is before pickup", async () => {
      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-09T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        ConflictException,
      );
    });

    it("should reject a rental longer than the configured maximum", async () => {
      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-02-15T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        "Rental duration cannot exceed 30 days",
      );

      expect(
        bookingRepository.findCarForBooking,
      ).not.toHaveBeenCalled();
    });

    it("should reject a car that does not exist", async () => {
      bookingRepository.findCarForBooking.mockResolvedValue(
        null,
      );

      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-12T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        "Car not found",
      );
    });

    it("should reject an unapproved car", async () => {
      bookingRepository.findCarForBooking.mockResolvedValue(
        {
          id: "car-1",
          ownerId: "owner-1",
          status: CarStatus.PENDING,
          pricePerDay:
            new Prisma.Decimal(2500),
        },
      );

      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-12T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        "This car is not available for booking",
      );
    });

    it("should reject an owner booking their own car", async () => {
      bookingRepository.findCarForBooking.mockResolvedValue(
        {
          id: "car-1",
          ownerId: "owner-1",
          status: CarStatus.APPROVED,
          pricePerDay:
            new Prisma.Decimal(2000),
        },
      );

      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-12T10:00:00Z",
        addOnIds: [],
      };

      await expect(
        service.createBooking(
          "owner-1",
          dto,
        ),
      ).rejects.toThrow(
        ForbiddenException,
      );
    });

    it("should reject invalid or inactive add-ons", async () => {
      bookingRepository.findCarForBooking.mockResolvedValue(
        {
          id: "car-1",
          ownerId: "owner-1",
          status: CarStatus.APPROVED,
          pricePerDay:
            new Prisma.Decimal(2000),
        },
      );

      bookingRepository.findActiveAddOns.mockResolvedValue(
        [],
      );

      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-12T10:00:00Z",
        addOnIds: ["addon-1"],
      };

      await expect(
        service.createBooking(
          "renter-1",
          dto,
        ),
      ).rejects.toThrow(
        "One or more selected add-ons are invalid or inactive",
      );
    });

    it("should create a booking successfully", async () => {
      const carPricePerDay =
        new Prisma.Decimal(2000);

      bookingRepository.findCarForBooking.mockResolvedValue(
        {
          id: "car-1",
          ownerId: "owner-1",
          status: CarStatus.APPROVED,
          pricePerDay: carPricePerDay,
        },
      );

      bookingRepository.findActiveAddOns.mockResolvedValue(
        [],
      );

      paymentService.processPayment.mockResolvedValue(
        {
          success: true,
          transactionId:
            "MOCK-123",
        },
      );

      bookingRepository.createBookingWithLock.mockResolvedValue(
        {
          id: "booking-1",
          referenceNumber:
            "CR-123",
          totalAmount:
            new Prisma.Decimal(4720),
        },
      );

      const dto = {
        carId: "car-1",
        pickupAt:
          "2030-01-10T10:00:00Z",
        dropOffAt:
          "2030-01-12T10:00:00Z",
        addOnIds: [],
      };

      const result =
        await service.createBooking(
          "renter-1",
          dto,
        );

      expect(
  paymentService.processPayment,
).toHaveBeenCalledWith(4720);

      expect(
        bookingRepository.createBookingWithLock,
      ).toHaveBeenCalledWith(
        "car-1",
        expect.objectContaining({
          days: 2,
          carPricePerDay:
            carPricePerDay,
          subtotal:
            new Prisma.Decimal(4000),
          tax:
            new Prisma.Decimal(720),
          totalAmount:
            new Prisma.Decimal(4720),
          status:
            BookingStatus.CONFIRMED,
        }),
        new Date(
          "2030-01-10T10:00:00Z",
        ),
        new Date(
          "2030-01-12T10:00:00Z",
        ),
      );

      expect(result.message).toBe(
        "Booking created successfully",
      );

      expect(
        result.payment.status,
      ).toBe("SUCCESS");

      expect(
        result.payment.transactionId,
      ).toBe("MOCK-123");

      expect(
        result.booking.id,
      ).toBe("booking-1");

      expect(
        result.booking.referenceNumber,
      ).toBe("CR-123");
    });
  });

  describe("cancelBooking", () => {
    it("should reject cancellation by another renter", async () => {
      bookingRepository.findByIdOrThrow.mockResolvedValue(
        {
          id: "booking-1",
          renterId: "renter-1",
          pickupAt:
            new Date(
              "2030-01-10T10:00:00Z",
            ),
          status:
            BookingStatus.CONFIRMED,
        },
      );

      await expect(
        service.cancelBooking(
          "booking-1",
          "renter-2",
        ),
      ).rejects.toThrow(
        ForbiddenException,
      );
    });

    it("should reject cancellation of a non-confirmed booking", async () => {
      bookingRepository.findByIdOrThrow.mockResolvedValue(
        {
          id: "booking-1",
          renterId: "renter-1",
          pickupAt:
            new Date(
              "2030-01-10T10:00:00Z",
            ),
          status:
            BookingStatus.CANCELLED,
        },
      );

      await expect(
        service.cancelBooking(
          "booking-1",
          "renter-1",
        ),
      ).rejects.toThrow(
        "Only confirmed bookings can be cancelled",
      );
    });
  });
});
