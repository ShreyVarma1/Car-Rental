import {
  Injectable,
} from "@nestjs/common";

import {
  PrismaService,
} from "../../prisma/prisma_services";

@Injectable()
export class ReviewRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findBookingForReview(
    bookingId: string,
  ) {
    return this.prisma.booking.findUnique({
      where: {
        id: bookingId,
      },

      select: {
        id: true,
        carId: true,
        renterId: true,
        status: true,
      },
    });
  }

  async findExistingReview(
    bookingId: string,
  ) {
    return this.prisma.review.findUnique({
      where: {
        bookingId,
      },
    });
  }

  async createReview(
    data: {
      bookingId: string;
      carId: string;
      renterId: string;
      rating: number;
      comment?: string;
    },
  ) {
    return this.prisma.review.create({
      data,

      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            city: true,
          },
        },
      },
    });
  }

  async findReviewsForCar(
    carId: string,
  ) {
    return this.prisma.review.findMany({
      where: {
        carId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        renter: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Average rating and review count for a specific
   * set of cars. Used by the owner dashboard so an
   * owner only sees ratings for their own cars.
   */
  async getAverageRatingsForCars(
    carIds: string[],
  ) {
    if (carIds.length === 0) {
      return [];
    }

    const grouped = await this.prisma.review.groupBy({
      by: ["carId"],
      where: {
        carId: {
          in: carIds,
        },
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return grouped.map((row) => ({
      carId: row.carId,
      averageRating: Number(
        (row._avg.rating ?? 0).toFixed(2),
      ),
      reviewCount: row._count.rating,
    }));
  }
}