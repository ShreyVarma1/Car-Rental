"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createBooking,
  getMyBookings,
  getMyBooking,
  cancelBooking,
} from "@/services/booking_services";

import { useAuth } from "@/hooks/use_auth";

import { CreateBookingRequest } from "@/types/booking";

export function useMyBookings() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["bookings"],
    queryFn: () =>
      getMyBookings(
        accessToken!,
        refreshAccessToken,
      ),
    enabled: Boolean(accessToken),
  });
}

export function useMyBooking(id: string) {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["booking", id],
    queryFn: () =>
      getMyBooking(
        id,
        accessToken!,
        refreshAccessToken,
      ),
    enabled: Boolean(accessToken) && Boolean(id),
  });
}

export function useCreateBooking() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) =>
      createBooking(data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useCancelBooking() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      cancelBooking(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
}
