"use client";

import { useQuery } from "@tanstack/react-query";

import { getHealth } from "@/services/health_services";

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });
}