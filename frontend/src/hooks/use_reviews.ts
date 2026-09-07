"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCarReviews,
  createReview,
} from "@/services/review_services";

import { useAuth } from "@/hooks/use_auth";

import { CreateReviewRequest } from "@/types/review";

export function useCarReviews(carId: string) {
  return useQuery({
    queryKey: ["reviews", carId],
    queryFn: () => getCarReviews(carId),
    enabled: Boolean(carId),
  });
}

export function useCreateReview() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) =>
      createReview(data, accessToken!, refreshAccessToken),
    onSuccess: () => {
      // Invalidate all reviews queries since we don't have the carId here
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
}
