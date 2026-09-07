export interface Review {
  id: string;
  bookingId: string;
  carId: string;
  renterId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  renter?: {
    id: string;
    name: string;
  };
}

export interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment?: string;
}
