"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/protected_route";

import { useMyBooking, useCancelBooking } from "@/hooks/use_bookings";
import { useCreateReview } from "@/hooks/use_reviews";
import { useAuth } from "@/hooks/use_auth";

import { BookingStatus } from "@/types/booking";
import { ApiError } from "@/services/api";

function statusColor(
  status: BookingStatus,
): "success" | "error" | "default" {
  if (status === "CONFIRMED") return "success";
  if (status === "CANCELLED") return "error";
  return "default";
}

export default function BookingDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { data: booking, isLoading, isError, error } = useMyBooking(id);
  const cancelBooking = useCancelBooking();
  const createReview = useCreateReview();
  const { user } = useAuth();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    await cancelBooking.mutateAsync(id);
  }

  async function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewError("");

    if (!rating) {
      setReviewError("Please select a rating.");
      return;
    }

    try {
      await createReview.mutateAsync({
        bookingId: id,
        rating,
        comment: comment || undefined,
      });

      setReviewSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setReviewError(err.message);
      } else {
        setReviewError("Unable to submit review. Please try again.");
      }
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !booking) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error instanceof ApiError ? error.message : "Booking not found."}
        </Alert>
      </Box>
    );
  }

  // booking.review is returned by GET /bookings/:id but is now typed on Booking
  const hasReview = Boolean(booking.review);

  const canReview =
    booking.status === "COMPLETED" &&
    user?.role === "RENTER" &&
    !hasReview;

  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Button component={Link} href="/bookings" variant="text" size="small">
            ← My Bookings
          </Button>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Booking Details
        </Typography>

        <Stack spacing={3}>
          {/* Summary Card */}
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {booking.car?.make} {booking.car?.model}
                  </Typography>

                  <Typography color="text.secondary" variant="body2">
                    Ref: {booking.referenceNumber}
                  </Typography>
                </Box>

                <Chip
                  label={booking.status}
                  color={statusColor(booking.status)}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5,
                }}
              >
                <Typography variant="body2">
                  <strong>Pickup:</strong>{" "}
                  {new Date(booking.pickupAt).toLocaleString("en-IN")}
                </Typography>

                <Typography variant="body2">
                  <strong>Drop-off:</strong>{" "}
                  {new Date(booking.dropOffAt).toLocaleString("en-IN")}
                </Typography>

                <Typography variant="body2">
                  <strong>Duration:</strong> {booking.days} day
                  {booking.days !== 1 ? "s" : ""}
                </Typography>

                <Typography variant="body2">
                  <strong>City:</strong> {booking.car?.city}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Price Breakdown
              </Typography>

              <Stack spacing={0.5}>
                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2">Car rental</Typography>
                  <Typography variant="body2">
                    ₹{Number(booking.carPricePerDay).toLocaleString("en-IN")} ×{" "}
                    {booking.days} days
                  </Typography>
                </Box>

                {Number(booking.addOnsTotal) > 0 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Add-ons</Typography>
                    <Typography variant="body2">
                      ₹{Number(booking.addOnsTotal).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2">Tax (18%)</Typography>
                  <Typography variant="body2">
                    ₹{Number(booking.tax).toLocaleString("en-IN")}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
                  </Typography>
                </Box>
              </Stack>

              {booking.bookingAddOns && booking.bookingAddOns.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Add-ons included:
                  </Typography>

                  {booking.bookingAddOns.map((ba) => (
                    <Typography key={ba.id} variant="body2" color="text.secondary">
                      • {ba.addOn.name} — ₹
                      {Number(ba.pricePerDaySnapshot).toLocaleString("en-IN")}
                      /day
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {booking.status === "CONFIRMED" && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              disabled={cancelBooking.isPending}
            >
              {cancelBooking.isPending ? "Cancelling..." : "Cancel Booking"}
            </Button>
          )}

          {/* Review Section */}
          {canReview && !reviewSuccess && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Leave a Review
                </Typography>

                {reviewError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {reviewError}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleReview}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Rating
                      </Typography>
                      <Rating
                        value={rating}
                        onChange={(_, v) => setRating(v)}
                      />
                    </Box>

                    <TextField
                      label="Comment (optional)"
                      multiline
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      fullWidth
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={createReview.isPending}
                    >
                      {createReview.isPending ? "Submitting..." : "Submit Review"}
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )}

          {reviewSuccess && (
            <Alert severity="success">Review submitted successfully!</Alert>
          )}
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
