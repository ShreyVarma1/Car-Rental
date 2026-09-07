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
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { useParams } from "next/navigation";

import ProtectedRoute from "@/components/auth/protected_route";

import { useOwnerBooking } from "@/hooks/use_owner_bookings";

import { BookingStatus } from "@/types/booking";
import { ApiError } from "@/services/api";

function statusColor(
  status: BookingStatus,
): "success" | "error" | "default" {
  if (status === "CONFIRMED") return "success";
  if (status === "CANCELLED") return "error";
  return "default";
}

export default function OwnerBookingDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { data: booking, isLoading, isError, error } = useOwnerBooking(id);

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

  return (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Button
            component={Link}
            href="/owner/bookings"
            variant="text"
            size="small"
          >
            ← Bookings
          </Button>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Booking Details
        </Typography>

        <Stack spacing={3}>
          {/* Header */}
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

          {/* Renter Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Renter
              </Typography>

              <Stack spacing={0.5}>
                <Typography variant="body2">
                  <strong>Name:</strong> {booking.renter?.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {booking.renter?.email}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Price */}
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
                    ₹
                    {Number(booking.carPricePerDay).toLocaleString("en-IN")} ×{" "}
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
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
