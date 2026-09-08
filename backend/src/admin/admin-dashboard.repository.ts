import { Injectable } from "@nestjs/common";

import {
  BookingStatus,
  CarStatus,
} from "../../generated/prisma/client";

import { PrismaService } from "../prisma/prisma_services";

@Injectable()
export class AdminDashboardRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUserStatistics() {
    const [
      totalUsers,
      activeUsers,
    ] = await Promise.all([
      this.prisma.user.count(),

      this.prisma.user.count({
        where: {
          isActive: true,
        },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
    };
  }

  async getCarStatistics() {
    const [
      totalCars,
      pendingCars,
      approvedCars,
      rejectedCars,
    ] = await Promise.all([
      this.prisma.car.count(),

      this.prisma.car.count({
        where: {
          status: CarStatus.PENDING,
        },
      }),

      this.prisma.car.count({
        where: {
          status: CarStatus.APPROVED,
        },
      }),

      this.prisma.car.count({
        where: {
          status: CarStatus.REJECTED,
        },
      }),
    ]);

    return {
      totalCars,
      pendingCars,
      approvedCars,
      rejectedCars,
    };
  }

  async getBookingStatistics() {
    const [
      totalBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    ] = await Promise.all([
      this.prisma.booking.count(),

      this.prisma.booking.count({
        where: {
          status:
            BookingStatus.CONFIRMED,
        },
      }),

      this.prisma.booking.count({
        where: {
          status:
            BookingStatus.COMPLETED,
        },
      }),

      this.prisma.booking.count({
        where: {
          status:
            BookingStatus.CANCELLED,
        },
      }),
    ]);

    return {
      totalBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    };
  }

  async getRevenue() {
    const result =
      await this.prisma.booking.aggregate({
        where: {
          status: {
            in: [
              BookingStatus.CONFIRMED,
              BookingStatus.COMPLETED,
            ],
          },
        },
        _sum: {
          totalAmount: true,
        },
      });

    return {
      totalRevenue:
        result._sum.totalAmount ?? 0,
    };
  }

  async getMostBookedCar() {
    const grouped =
      await this.prisma.booking.groupBy({
        by: ["carId"],
        where: {
          status: {
            in: [
              BookingStatus.CONFIRMED,
              BookingStatus.COMPLETED,
            ],
          },
        },
        _count: {
          carId: true,
        },
        orderBy: {
          _count: {
            carId: "desc",
          },
        },
        take: 1,
      });

    if (grouped.length === 0) {
      return null;
    }

    const car =
      await this.prisma.car.findUnique({
        where: {
          id: grouped[0].carId,
        },
        select: {
          id: true,
          make: true,
          model: true,
          type: true,
          city: true,
        },
      });

    if (!car) {
      return null;
    }

    return {
      ...car,
      bookingCount:
        grouped[0]._count.carId,
    };
  }

  async getMostBookedCarType() {
    const bookings =
      await this.prisma.booking.findMany({
        where: {
          status: {
            in: [
              BookingStatus.CONFIRMED,
              BookingStatus.COMPLETED,
            ],
          },
        },
        select: {
          car: {
            select: {
              type: true,
            },
          },
        },
      });

    if (bookings.length === 0) {
      return null;
    }

    const counts =
      new Map<string, number>();

    for (const booking of bookings) {
      const type = booking.car.type;

      counts.set(
        type,
        (counts.get(type) ?? 0) + 1,
      );
    }

    const mostBooked =
      [...counts.entries()].sort(
        (a, b) => b[1] - a[1],
      )[0];

    return {
      type: mostBooked[0],
      bookingCount: mostBooked[1],
    };
  }

  async getAverageRating() {
    const result =
      await this.prisma.review.aggregate({
        _avg: {
          rating: true,
        },
      });

    return result._avg.rating ?? 0;
  }

  /**
   * Revenue and booking volume broken down per car,
   * sorted by revenue (highest first).
   *
   * Aggregation is done in application code rather than
   * a SQL join so this works the same regardless of the
   * underlying database engine (Postgres or NoSQL).
   */
  async getRevenueByCar(limit = 20) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        status: {
          in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED],
        },
      },
      select: {
        carId: true,
        totalAmount: true,
        car: {
          select: {
            make: true,
            model: true,
            city: true,
            ownerId: true,
          },
        },
      },
    });

    const byCar = new Map<
      string,
      {
        carId: string;
        make: string;
        model: string;
        city: string;
        ownerId: string;
        totalRevenue: number;
        bookingCount: number;
      }
    >();

    for (const booking of bookings) {
      const existing = byCar.get(booking.carId);
      const amount = booking.totalAmount.toNumber();

      if (existing) {
        existing.totalRevenue += amount;
        existing.bookingCount += 1;
      } else {
        byCar.set(booking.carId, {
          carId: booking.carId,
          make: booking.car.make,
          model: booking.car.model,
          city: booking.car.city,
          ownerId: booking.car.ownerId,
          totalRevenue: amount,
          bookingCount: 1,
        });
      }
    }

    return [...byCar.values()]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit);
  }

  /**
   * Revenue and fleet size broken down per car owner,
   * sorted by revenue (highest first).
   */
  async getRevenueByOwner(limit = 20) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        status: {
          in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED],
        },
      },
      select: {
        carId: true,
        totalAmount: true,
        car: {
          select: {
            ownerId: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const byOwner = new Map<
      string,
      {
        ownerId: string;
        ownerName: string;
        ownerEmail: string;
        totalRevenue: number;
        bookingCount: number;
        carIds: Set<string>;
      }
    >();

    for (const booking of bookings) {
      const ownerId = booking.car.ownerId;
      const amount = booking.totalAmount.toNumber();
      const existing = byOwner.get(ownerId);

      if (existing) {
        existing.totalRevenue += amount;
        existing.bookingCount += 1;
        existing.carIds.add(booking.carId);
      } else {
        byOwner.set(ownerId, {
          ownerId,
          ownerName: booking.car.owner.name,
          ownerEmail: booking.car.owner.email,
          totalRevenue: amount,
          bookingCount: 1,
          carIds: new Set([booking.carId]),
        });
      }
    }

    return [...byOwner.values()]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit)
      .map((owner) => ({
        ownerId: owner.ownerId,
        ownerName: owner.ownerName,
        ownerEmail: owner.ownerEmail,
        totalRevenue: owner.totalRevenue,
        bookingCount: owner.bookingCount,
        carCount: owner.carIds.size,
      }));
  }

  /**
   * Booking volume (utilisation) per car, grouped by the
   * calendar month of pickup. Returned rows are sorted by
   * month (oldest first) so the frontend can chart a trend
   * line per car.
   */
  async getMonthlyUtilizationByCar() {
    const bookings = await this.prisma.booking.findMany({
      where: {
        status: {
          in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED],
        },
      },
      select: {
        carId: true,
        pickupAt: true,
        car: {
          select: {
            make: true,
            model: true,
          },
        },
      },
    });

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

    for (const booking of bookings) {
      const month = booking.pickupAt.toISOString().slice(0, 7);
      const key = `${booking.carId}:${month}`;
      const existing = byCarMonth.get(key);

      if (existing) {
        existing.bookingCount += 1;
      } else {
        byCarMonth.set(key, {
          carId: booking.carId,
          make: booking.car.make,
          model: booking.car.model,
          month,
          bookingCount: 1,
        });
      }
    }

    return [...byCarMonth.values()].sort((a, b) =>
      a.month === b.month
        ? a.make.localeCompare(b.make)
        : a.month.localeCompare(b.month),
    );
  }

  /**
   * Average rating and review volume per car, sorted by
   * rating (highest first). Cars without any reviews yet
   * are omitted rather than shown with a misleading 0.
   */
  async getAverageRatingByCar(limit = 20) {
    const reviews = await this.prisma.review.findMany({
      select: {
        carId: true,
        rating: true,
        car: {
          select: {
            make: true,
            model: true,
          },
        },
      },
    });

    const byCar = new Map<
      string,
      {
        carId: string;
        make: string;
        model: string;
        ratingTotal: number;
        reviewCount: number;
      }
    >();

    for (const review of reviews) {
      const existing = byCar.get(review.carId);

      if (existing) {
        existing.ratingTotal += review.rating;
        existing.reviewCount += 1;
      } else {
        byCar.set(review.carId, {
          carId: review.carId,
          make: review.car.make,
          model: review.car.model,
          ratingTotal: review.rating,
          reviewCount: 1,
        });
      }
    }

    return [...byCar.values()]
      .map((car) => ({
        carId: car.carId,
        make: car.make,
        model: car.model,
        averageRating: Number(
          (car.ratingTotal / car.reviewCount).toFixed(2),
        ),
        reviewCount: car.reviewCount,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);
  }
}