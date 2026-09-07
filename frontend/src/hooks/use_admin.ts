"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminDashboard,
  getAdminUsers,
  updateUserRole,
  deleteAdminUser,
  getAdminCars,
  approveAdminCar,
  rejectAdminCar,
  getAdminBookings,
  cancelAdminBooking,
  getAdminAddOns,
  createAdminAddOn,
  updateAdminAddOn,
  deleteAdminAddOn,
} from "@/services/admin_services";

import { useAuth } from "@/hooks/use_auth";

export function useAdminDashboard() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () =>
      getAdminDashboard(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useAdminUsers() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["admin-users"],
    queryFn: () =>
      getAdminUsers(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useUpdateUserRole() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      updateUserRole(id, role, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

export function useDeleteAdminUser() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteAdminUser(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

export function useAdminCars() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["admin-cars"],
    queryFn: () =>
      getAdminCars(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useApproveAdminCar() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      approveAdminCar(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    },
  });
}

export function useRejectAdminCar() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      rejectAdminCar(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    },
  });
}

export function useAdminBookings() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () =>
      getAdminBookings(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useCancelAdminBooking() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      cancelAdminBooking(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
  });
}

export function useAdminAddOns() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["admin-addons"],
    queryFn: () =>
      getAdminAddOns(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useCreateAdminAddOn() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      pricePerDay: number;
    }) => createAdminAddOn(data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-addons"] });
    },
  });
}

export function useUpdateAdminAddOn() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        description?: string;
        pricePerDay?: number;
        isActive?: boolean;
      };
    }) => updateAdminAddOn(id, data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-addons"] });
    },
  });
}

export function useDeleteAdminAddOn() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteAdminAddOn(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-addons"] });
    },
  });
}
