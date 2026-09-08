import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { ActivityAction } from "../../generated/prisma/client";

import { BookingRepository } from "./booking.repository";
import { NotificationService } from "../engagement/notification/notification.service";
import { ActivityService } from "../engagement/activity/activity.service";

/**
 * Business rule (PDF spec, section 4/5): a booking is only
 * eligible for a review once it is COMPLETED, and reporting
 * (average rating, cancellation rate, completed-booking
 * revenue) is only meaningful once bookings actually reach
 * that terminal state.
 *
 * Nothing else in the system ever transitions a booking out
 * of CONFIRMED except cancellation, so this scheduled job is
 * the single place responsible for marking a booking
 * COMPLETED once its drop-off time has passed.
 */
@Injectable()
export class BookingCompletionService {
  private readonly logger = new Logger(BookingCompletionService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly notificationService: NotificationService,
    private readonly activityService: ActivityService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async completePastBookings() {
    const pendingBookings =
      await this.bookingRepository.findBookingsPendingCompletion();

    if (pendingBookings.length === 0) {
      return;
    }

    const ids = pendingBookings.map((booking) => booking.id);

    const result = await this.bookingRepository.markBookingsCompleted(ids);

    this.logger.log(
      `Marked ${result.count} booking(s) as COMPLETED`,
    );

    await Promise.all(
      pendingBookings.map((booking) =>
        this.handleBookingCompletedSideEffects(booking),
      ),
    );
  }

  private async handleBookingCompletedSideEffects(booking: {
    id: string;
    referenceNumber: string;
    renterId: string;
    car: { ownerId: string; make: string; model: string };
  }) {
    try {
      const carName = `${booking.car.make} ${booking.car.model}`;

      await Promise.all([
        this.notificationService.createNotification({
          userId: booking.renterId,
          title: "Rental completed",
          message: `Your rental ${booking.referenceNumber} for ${carName} has been marked as completed. You can now leave a review.`,
        }),

        this.notificationService.createNotification({
          userId: booking.car.ownerId,
          title: "Rental completed",
          message: `The rental ${booking.referenceNumber} for your ${carName} has been completed.`,
        }),

        this.activityService.createActivity({
          action: ActivityAction.UPDATE,
          entity: "BOOKING",
          entityId: booking.id,
          details: {
            referenceNumber: booking.referenceNumber,
            statusChangedTo: "COMPLETED",
          },
        }),
      ]);
    } catch (error) {
      this.logger.error(
        "Booking completion side effects failed",
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
