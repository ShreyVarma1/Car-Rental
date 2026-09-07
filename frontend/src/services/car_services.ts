import {
  apiRequest,
} from "./api";

import {
  authenticatedRequest,
} from "./authenticated_api";

import {
  Car,
  CarSearchResponse,
  SearchCarsParams,
} from "@/types/car";

function buildSearchQuery(
  params: SearchCarsParams,
) {
  const searchParams =
    new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        searchParams.set(
          key,
          String(value),
        );
      }
    },
  );

  const query =
    searchParams.toString();

  return query
    ? `?${query}`
    : "";
}

export function searchCars(
  params: SearchCarsParams,
) {
  const query =
    buildSearchQuery(params);

  return apiRequest<CarSearchResponse>(
    `/cars${query}`,
  );
}

export function getCar(
  id: string,
) {
  return apiRequest<Car>(
    `/cars/${id}`,
  );
}

export function getOwnerCars(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car[]>(
    "/cars/owner",
    {
      accessToken,
      refreshAccessToken,
    },
  );
}