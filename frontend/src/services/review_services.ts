import { apiRequest } from "./api";
import { authenticatedRequest } from "./authenticated_api";

import { Review, CreateReviewRequest } from "@/types/review";

export function getCarReviews(carId: string) {
  return apiRequest<Review[]>(`/reviews/car/${carId}`);
}

export function createReview(
  data: CreateReviewRequest,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Review>("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
    accessToken,
    refreshAccessToken,
  });
}
