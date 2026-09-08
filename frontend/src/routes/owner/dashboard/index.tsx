"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Rating,
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
import { useOwnerDashboard } from "@/hooks/use_owner_bookings";
import { ApiError } from "@/services/api";

interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function OwnerDashboardPage() {
  const { data: dashboard, isLoading, isError, error } = useOwnerDashboard();

  return (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          My Dashboard
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError
              ? error.message
              : "Unable to load your dashboard."}
          </Alert>
        )}

        {dashboard && (
          <Stack spacing={4}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <StatCard
                title="Total Revenue (Confirmed + Completed)"
                value={`₹${dashboard.totalRevenue.toLocaleString("en-IN")}`}
              />
              <StatCard
                title="Total Bookings"
                value={dashboard.totalBookings}
              />
            </Box>

            {/* Revenue & rating per car */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Revenue by Car
              </Typography>

              {dashboard.revenueByCar.length === 0 ? (
                <Alert severity="info">
                  No bookings for your cars yet.
                </Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Bookings
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Revenue
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboard.revenueByCar.map((row) => (
                        <TableRow key={row.carId} hover>
                          <TableCell>
                            {row.make} {row.model}
                          </TableCell>
                          <TableCell align="right">
                            {row.bookingCount}
                          </TableCell>
                          <TableCell>
                            {row.averageRating !== null ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Rating
                                  value={row.averageRating}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                                <Typography variant="body2">
                                  ({row.reviewCount})
                                </Typography>
                              </Box>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                No reviews yet
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            ₹{row.totalRevenue.toLocaleString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>

            {/* Monthly utilisation */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Monthly Utilisation
              </Typography>

              {dashboard.monthlyUtilization.length === 0 ? (
                <Alert severity="info">
                  No booking activity yet.
                </Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Month</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Bookings
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboard.monthlyUtilization.map((row) => (
                        <TableRow
                          key={`${row.carId}-${row.month}`}
                          hover
                        >
                          <TableCell>
                            {row.make} {row.model}
                          </TableCell>
                          <TableCell>
                            <Chip label={row.month} size="small" />
                          </TableCell>
                          <TableCell align="right">
                            {row.bookingCount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Stack>
        )}
      </Box>
    </ProtectedRoute>
  );
}
