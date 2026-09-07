"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getOwnerCars,
} from "@/services/car_services";

import {
  createCar,
  updateCar,
  deleteCar,
} from "@/services/admin_services";

import { useAuth } from "@/hooks/use_auth";

export function useOwnerCars() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["owner-cars"],
    queryFn: () =>
      getOwnerCars(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useCreateCar() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: object) =>
      createCar(data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-cars"] });
    },
  });
}

export function useUpdateCar() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) =>
      updateCar(id, data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-cars"] });
    },
  });
}

export function useDeleteCar() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteCar(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-cars"] });
    },
  });
}
