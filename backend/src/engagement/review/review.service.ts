import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";

import {
  ActivityAction,
  BookingStatus,
} from "../../../generated/prisma/client";

import {
  ReviewRepository,
} from "./review.repository";

import {
  CreateReviewDto,
} from "./dto/create-review.dto";

import {
  ActivityService,
} from "../activity/activity.service";

@Injectable()
export class ReviewService {
  private readonly logger =
    new Logger(ReviewService.name);

  constructor(
    private readonly reviewRepository:
      ReviewRepository,

    private readonly activityService:
      ActivityService,
  ) {}

  async createReview(
    renterId: string,
    dto: CreateReviewDto,
  ) {
    const bookingId = dto.bookingId;

    if (!bookingId) {
      throw new BadRequestException(
        "Booking ID is required",
      );
    }

    const booking =
      await this.reviewRepository
        .findBookingForReview(
          bookingId,
        );

    if (!booking) {
      throw new NotFoundException(
        "Booking not found",
      );
    }

    if (
      booking.renterId !==
      renterId
    ) {
      throw new ConflictException(
        "You can only review your own booking",
      );
    }

    if (
      booking.status !==
      BookingStatus.COMPLETED
    ) {
      throw new ConflictException(
        "Only completed bookings can be reviewed",
      );
    }

    const existingReview =
      await this.reviewRepository
        .findExistingReview(
          dto.bookingId,
        );

    if (existingReview) {
      throw new ConflictException(
        "This booking has already been reviewed",
      );
    }

    const review =
      await this.reviewRepository
        .createReview({
          bookingId:
            booking.id,

          carId:
            booking.carId,

          renterId,

          rating:
            dto.rating,

          comment:
            dto.comment?.trim(),
        });

    try {
      await this.activityService
        .createActivity({
          userId: renterId,

          action:
            ActivityAction.CREATE,

          entity: "REVIEW",

          entityId: review.id,

          details: {
            bookingId:
              booking.id,

            carId:
              booking.carId,

            rating:
              dto.rating,
          },
        });
    } catch (error) {
      this.logger.error(
        "Review activity logging failed",
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }

    return review;
  }

  async getCarReviews(
    carId: string,
  ) {
    return this.reviewRepository
      .findReviewsForCar(
        carId,
      );
  }
}