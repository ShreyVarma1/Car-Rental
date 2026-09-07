"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getAddOns,
} from "@/services/addon_services";

export function useAddOns() {
  return useQuery({
    queryKey: [
      "addons",
    ],
    queryFn: getAddOns,
  });
}