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

import { useOwnerBookings } from "@/hooks/use_owner_bookings";

import { Booking, BookingStatus } from "@/types/booking";
import { ApiError } from "@/services/api";

function statusColor(
  status: BookingStatus,
): "success" | "error" | "default" {
  if (status === "CONFIRMED") return "success";
  if (status === "CANCELLED") return "error";
  return "default";
}

function BookingRow({ booking }: { booking: Booking }) {
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
              Renter: {booking.renter?.name} ({booking.renter?.email})
            </Typography>

            <Typography variant="body2">
              📅 {new Date(booking.pickupAt).toLocaleDateString("en-IN")} →{" "}
              {new Date(booking.dropOffAt).toLocaleDateString("en-IN")} &nbsp;|&nbsp;{" "}
              {booking.days} day{booking.days !== 1 ? "s" : ""}
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
              href={`/owner/bookings/${booking.id}`}
              variant="outlined"
              size="small"
            >
              Details
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function OwnerBookingsPage() {
  const { data: bookings, isLoading, isError, error } = useOwnerBookings();

  return (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Bookings on My Cars
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
          <Alert severity="info">No bookings on your cars yet.</Alert>
        )}

        <Stack spacing={2}>
          {bookings?.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
