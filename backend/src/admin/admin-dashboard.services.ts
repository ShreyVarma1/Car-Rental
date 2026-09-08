import {
  Injectable,
} from "@nestjs/common";

import {
  AdminDashboardRepository,
} from "./admin-dashboard.repository";

@Injectable()
export class AdminDashboardService {
  constructor(
    private readonly dashboardRepository: AdminDashboardRepository,
  ) {}

  async getDashboard() {
    const [
      userStatistics,
      carStatistics,
      bookingStatistics,
      revenue,
      mostBookedCar,
      mostBookedCarType,
      averageRating,
      revenueByCar,
      revenueByOwner,
      monthlyUtilizationByCar,
      averageRatingByCar,
    ] = await Promise.all([
      this.dashboardRepository
        .getUserStatistics(),

      this.dashboardRepository
        .getCarStatistics(),

      this.dashboardRepository
        .getBookingStatistics(),

      this.dashboardRepository
        .getRevenue(),

      this.dashboardRepository
        .getMostBookedCar(),

      this.dashboardRepository
        .getMostBookedCarType(),

      this.dashboardRepository
        .getAverageRating(),

      this.dashboardRepository
        .getRevenueByCar(),

      this.dashboardRepository
        .getRevenueByOwner(),

      this.dashboardRepository
        .getMonthlyUtilizationByCar(),

      this.dashboardRepository
        .getAverageRatingByCar(),
    ]);

    const totalBookings =
      bookingStatistics.totalBookings;

    const cancellationRate =
      totalBookings === 0
        ? 0
        : (
            bookingStatistics.cancelledBookings /
            totalBookings
          ) *
          100;

    return {
      users: userStatistics,

      cars: carStatistics,

      bookings: bookingStatistics,

      revenue: {
        total:
          revenue.totalRevenue,
      },

      performance: {
        mostBookedCar,
        mostBookedCarType,
        averageRating,
        cancellationRate:
          Number(
            cancellationRate.toFixed(2),
          ),
      },

      /*
       * PDF spec (section 11): bookings per car per
       * month, revenue per car and per owner, and
       * average rating per car.
       */
      reports: {
        revenueByCar,
        revenueByOwner,
        monthlyUtilizationByCar,
        averageRatingByCar,
      },
    };
  }
}