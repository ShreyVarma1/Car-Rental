import { authenticatedRequest } from "./authenticated_api";

import {
  Booking,
  CreateBookingRequest,
  CreateBookingResponse,
} from "@/types/booking";

export function createBooking(
  data: CreateBookingRequest,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  // POST /bookings returns { message, payment, booking }
  // We unwrap to just return the booking object
  return authenticatedRequest<CreateBookingResponse>(
    "/bookings",
    {
      method: "POST",
      body: JSON.stringify(data),
      accessToken,
      refreshAccessToken,
    },
  );
}

export function getMyBookings(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking[]>("/bookings", {
    accessToken,
    refreshAccessToken,
  });
}

export function getMyBooking(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking>(`/bookings/${id}`, {
    accessToken,
    refreshAccessToken,
  });
}

export function cancelBooking(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<{
    message: string;
    booking: Partial<Booking>;
  }>(
    `/bookings/${id}/cancel`,
    {
      method: "PATCH",
      accessToken,
      refreshAccessToken,
    },
  );
}
