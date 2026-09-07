"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  searchCars,
  getCar,
} from "@/services/car_services";

import {
  SearchCarsParams,
} from "@/types/car";

export function useCars(
  params: SearchCarsParams,
) {
  return useQuery({
    queryKey: [
      "cars",
      params,
    ],
    queryFn: () =>
      searchCars(params),
  });
}

export function useCar(
  id: string,
) {
  return useQuery({
    queryKey: [
      "car",
      id,
    ],
    queryFn: () =>
      getCar(id),
    enabled: Boolean(id),
  });
}