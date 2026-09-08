import { authenticatedRequest } from "./authenticated_api";

import { Booking } from "@/types/booking";
import { OwnerDashboard } from "@/types/admin";

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

export function getOwnerDashboard(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<OwnerDashboard>("/owner/bookings/dashboard", {
    accessToken,
    refreshAccessToken,
  });
}
