import { authenticatedRequest } from "./authenticated_api";

import { Booking } from "@/types/booking";

export function getOwnerBookings(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking[]>("/owner/bookings", {
    accessToken,
    refreshAccessToken,
  });
}

export function getOwnerBooking(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking>(`/owner/bookings/${id}`, {
    accessToken,
    refreshAccessToken,
  });
}
