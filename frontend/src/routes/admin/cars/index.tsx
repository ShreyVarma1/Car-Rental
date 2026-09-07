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
  useAdminCars,
  useApproveAdminCar,
  useRejectAdminCar,
} from "@/hooks/use_admin";

import { CarStatus } from "@/types/car";
import { ApiError } from "@/services/api";

function statusColor(
  status: CarStatus,
): "success" | "warning" | "error" | "default" {
  if (status === "APPROVED") return "success";
  if (status === "PENDING") return "warning";
  if (status === "REJECTED") return "error";
  return "default";
}

export default function AdminCarsPage() {
  const { data: cars, isLoading, isError, error } = useAdminCars();
  const approve = useApproveAdminCar();
  const reject = useRejectAdminCar();

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Manage Cars
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError ? error.message : "Unable to load cars."}
          </Alert>
        )}

        {cars && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Owner</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price/Day</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {car.make} {car.model}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {car.year} • {car.type} • {car.transmission}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {car.owner?.name ?? car.ownerId}
                      </Typography>
                    </TableCell>

                    <TableCell>{car.city}</TableCell>

                    <TableCell>
                      ₹{Number(car.pricePerDay).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={car.status}
                        color={statusColor(car.status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {car.status === "PENDING" && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => approve.mutate(car.id)}
                            disabled={
                              approve.isPending || reject.isPending
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => reject.mutate(car.id)}
                            disabled={
                              approve.isPending || reject.isPending
                            }
                          >
                            Reject
                          </Button>
                        </Stack>
                      )}

                      {car.status !== "PENDING" && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          —
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ProtectedRoute>
  );
}
