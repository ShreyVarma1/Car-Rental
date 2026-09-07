"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";

import ProtectedRoute from "@/components/auth/protected_route";

import { useMyBookings, useCancelBooking } from "@/hooks/use_bookings";

import { Booking, BookingStatus } from "@/types/booking";

import { ApiError } from "@/services/api";

function statusColor(
  status: BookingStatus,
): "success" | "error" | "default" {
  if (status === "CONFIRMED") return "success";
  if (status === "CANCELLED") return "error";
  return "default";
}

function BookingCard({ booking }: { booking: Booking }) {
  const cancelBooking = useCancelBooking();

  async function handleCancel() {
    if (!confirm("Cancel this booking?")) return;
    cancelBooking.mutate(booking.id);
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {booking.car?.make} {booking.car?.model}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              Ref: {booking.referenceNumber}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              📅 {new Date(booking.pickupAt).toLocaleDateString("en-IN")} →{" "}
              {new Date(booking.dropOffAt).toLocaleDateString("en-IN")}
            </Typography>

            <Typography variant="body2">
              📍 {booking.car?.city} &nbsp;|&nbsp; {booking.days} day
              {booking.days !== 1 ? "s" : ""}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>
              ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              gap: 1,
            }}
          >
            <Chip
              label={booking.status}
              color={statusColor(booking.status)}
              size="small"
            />

            <Button
              component={Link}
              href={`/bookings/${booking.id}`}
              variant="outlined"
              size="small"
            >
              View
            </Button>

            {booking.status === "CONFIRMED" && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleCancel}
                disabled={cancelBooking.isPending}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function MyBookingsPage() {
  const { data: bookings, isLoading, isError, error } = useMyBookings();

  return (
    <ProtectedRoute allowedRoles={["RENTER"]}>
      <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          My Bookings
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError ? error.message : "Unable to load bookings."}
          </Alert>
        )}

        {!isLoading && bookings?.length === 0 && (
          <Alert severity="info">
            You have no bookings yet.{" "}
            <Link href="/cars">Browse cars</Link> to make one.
          </Alert>
        )}

        <Stack spacing={2}>
          {bookings?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
