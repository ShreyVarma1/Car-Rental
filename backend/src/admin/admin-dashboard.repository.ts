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
}