"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getOwnerBookings,
  getOwnerBooking,
  getOwnerDashboard,
} from "@/services/owner_booking_services";

import { useAuth } from "@/hooks/use_auth";

export function useOwnerBookings() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["owner-bookings"],
    queryFn: () =>
      getOwnerBookings(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useOwnerBooking(id: string) {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["owner-booking", id],
    queryFn: () =>
      getOwnerBooking(id, accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken) && Boolean(id),
  });
}

export function useOwnerDashboard() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["owner-dashboard"],
    queryFn: () =>
      getOwnerDashboard(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}
