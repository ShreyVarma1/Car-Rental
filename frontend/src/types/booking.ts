export type BookingStatus =
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface BookingCar {
  id: string;
  make: string;
  model: string;
  city: string;
  pricePerDay?: string | number;
  ownerId?: string;
}

export interface BookingRenter {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface BookingAddOn {
  id: string;
  addOnId: string;
  pricePerDaySnapshot: string | number;
  addOn: {
    id: string;
    name: string;
    description?: string | null;
    pricePerDay?: string | number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface BookingReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface Booking {
  id: string;
  referenceNumber: string;

  carId: string;
  renterId: string;

  pickupAt: string;
  dropOffAt: string;

  days: number;

  // All monetary values come as Decimal strings from Prisma
  carPricePerDay: string | number;
  addOnsTotal: string | number;
  subtotal: string | number;
  tax: string | number;
  totalAmount: string | number;

  status: BookingStatus;

  car?: BookingCar;
  renter?: BookingRenter;
  bookingAddOns?: BookingAddOn[];
  review?: BookingReview | null;

  createdAt: string;
  updatedAt: string;
}

// Shape returned by POST /bookings
export interface CreateBookingResponse {
  message: string;
  payment: {
    status: string;
    transactionId: string;
  };
  booking: Booking;
}

export interface CreateBookingRequest {
  carId: string;
  pickupAt: string;
  dropOffAt: string;
  addOnIds?: string[];
}
