// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface AdminDashboard {
  users: {
    totalUsers: number;
    activeUsers: number;
  };
  cars: {
    totalCars: number;
    pendingCars: number;
    approvedCars: number;
    rejectedCars: number;
  };
  bookings: {
    totalBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    cancelledBookings: number;
  };
  revenue: {
    total: string | number;
  };
  performance: {
    mostBookedCar: {
      id: string;
      make: string;
      model: string;
      type: string;
      city: string;
      bookingCount: number;
    } | null;
    mostBookedCarType: {
      type: string;
      bookingCount: number;
    } | null;
    averageRating: number;
    cancellationRate: number;
  };
}

// ─── Users ────────────────────────────────────────────────────────────────────

// Shape returned by GET /admin/users (list) — no isActive
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  drivingLicense: string | null;
  role: "RENTER" | "OWNER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

// Shape returned by GET /admin/users/:id (detail) — includes cars & bookings
export interface AdminUserDetail extends AdminUser {
  cars: {
    id: string;
    make: string;
    model: string;
    year: number;
    type: string;
    city: string;
    pricePerDay: string | number;
    status: string;
    createdAt: string;
  }[];
  bookings: {
    id: string;
    referenceNumber: string;
    carId: string;
    pickupAt: string;
    dropOffAt: string;
    days: number;
    totalAmount: string | number;
    status: string;
    createdAt: string;
  }[];
}
