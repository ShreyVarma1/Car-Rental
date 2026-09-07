"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ProtectedRoute from "@/components/auth/protected_route";

import {
  useAdminBookings,
  useCancelAdminBooking,
} from "@/hooks/use_admin";

import { BookingStatus } from "@/types/booking";
import { ApiError } from "@/services/api";

function statusColor(
  status: BookingStatus,
): "success" | "error" | "default" {
  if (status === "CONFIRMED") return "success";
  if (status === "CANCELLED") return "error";
  return "default";
}

export default function AdminBookingsPage() {
  const { data: bookings, isLoading, isError, error } = useAdminBookings();
  const cancel = useCancelAdminBooking();

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Box sx={{ maxWidth: 1300, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          All Bookings
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

        {bookings && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Reference</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Renter</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Pickup</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Drop-off</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Typography variant="caption">
                        {booking.referenceNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {booking.car?.make} {booking.car?.model}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {booking.renter?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.renter?.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {new Date(booking.pickupAt).toLocaleDateString("en-IN")}
                    </TableCell>

                    <TableCell>
                      {new Date(booking.dropOffAt).toLocaleDateString("en-IN")}
                    </TableCell>

                    <TableCell>
                      ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={statusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {booking.status === "CONFIRMED" && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => cancel.mutate(booking.id)}
                          disabled={cancel.isPending}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && bookings?.length === 0 && (
          <Alert severity="info">No bookings found.</Alert>
        )}
      </Box>
    </ProtectedRoute>
  );
}
