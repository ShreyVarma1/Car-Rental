"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
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
import { useAdminDashboard } from "@/hooks/use_admin";
import { ApiError } from "@/services/api";

interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
}

function StatCard({ title, value, sub }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>
          {value}
        </Typography>

        {sub && (
          <Typography variant="body2" color="text.secondary">
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError, error } = useAdminDashboard();

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Admin Dashboard
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
              : "Unable to load dashboard."}
          </Alert>
        )}

        {stats && (
          <Stack spacing={4}>
            {/* Users */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Users
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <StatCard
                  title="Total Users"
                  value={stats.users.totalUsers}
                />
                <StatCard
                  title="Active Users"
                  value={stats.users.activeUsers}
                />
              </Box>
            </Box>

            {/* Cars */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Cars
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <StatCard title="Total" value={stats.cars.totalCars} />
                <StatCard title="Approved" value={stats.cars.approvedCars} />
                <StatCard title="Pending" value={stats.cars.pendingCars} />
                <StatCard title="Rejected" value={stats.cars.rejectedCars} />
              </Box>
            </Box>

            {/* Bookings */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Bookings
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <StatCard
                  title="Total"
                  value={stats.bookings.totalBookings}
                />
                <StatCard
                  title="Confirmed"
                  value={stats.bookings.confirmedBookings}
                />
                <StatCard
                  title="Completed"
                  value={stats.bookings.completedBookings}
                />
                <StatCard
                  title="Cancelled"
                  value={stats.bookings.cancelledBookings}
                />
              </Box>
            </Box>

            {/* Revenue */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Revenue
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 2,
                }}
              >
                <StatCard
                  title="Total Revenue (Confirmed + Completed)"
                  value={`₹${Number(stats.revenue.total).toLocaleString(
                    "en-IN",
                  )}`}
                />
              </Box>
            </Box>

            {/* Performance */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Performance
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {/* Cancellation Rate */}
                <StatCard
                  title="Cancellation Rate"
                  value={`${stats.performance.cancellationRate}%`}
                />

                {/* Average Rating */}
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" variant="body2">
                      Average Rating
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.performance.averageRating > 0
                          ? stats.performance.averageRating.toFixed(1)
                          : "—"}
                      </Typography>
                      {stats.performance.averageRating > 0 && (
                        <Rating
                          value={stats.performance.averageRating}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>

                {/* Most Booked Car */}
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" variant="body2">
                      Most Booked Car
                    </Typography>

                    {stats.performance.mostBookedCar ? (
                      <Box sx={{ mt: 0.5 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          {stats.performance.mostBookedCar.make}{" "}
                          {stats.performance.mostBookedCar.model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stats.performance.mostBookedCar.city} •{" "}
                          {stats.performance.mostBookedCar.bookingCount}{" "}
                          bookings
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mt: 0.5 }}
                      >
                        —
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                {/* Most Booked Car Type */}
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" variant="body2">
                      Most Booked Type
                    </Typography>

                    {stats.performance.mostBookedCarType ? (
                      <Box sx={{ mt: 0.5 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          {stats.performance.mostBookedCarType.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stats.performance.mostBookedCarType.bookingCount}{" "}
                          bookings
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mt: 0.5 }}
                      >
                        —
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Divider />

            {/* Reports (revenue & utilisation breakdowns) */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Reports
              </Typography>

              <Stack spacing={3}>
                {/* Revenue by Car */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Revenue by Car
                  </Typography>

                  {stats.reports.revenueByCar.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No revenue data yet.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Bookings
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Revenue
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {stats.reports.revenueByCar.map((row) => (
                            <TableRow key={row.carId} hover>
                              <TableCell>
                                {row.make} {row.model}
                              </TableCell>
                              <TableCell>{row.city}</TableCell>
                              <TableCell align="right">{row.bookingCount}</TableCell>
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

                {/* Revenue by Owner */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Revenue by Owner
                  </Typography>

                  {stats.reports.revenueByOwner.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No revenue data yet.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Owner</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Cars
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Bookings
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Revenue
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {stats.reports.revenueByOwner.map((row) => (
                            <TableRow key={row.ownerId} hover>
                              <TableCell>
                                <Typography variant="body2">{row.ownerName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {row.ownerEmail}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">{row.carCount}</TableCell>
                              <TableCell align="right">{row.bookingCount}</TableCell>
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

                {/* Average Rating by Car */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Average Rating by Car
                  </Typography>

                  {stats.reports.averageRatingByCar.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No reviews yet.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Car</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">
                              Reviews
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {stats.reports.averageRatingByCar.map((row) => (
                            <TableRow key={row.carId} hover>
                              <TableCell>
                                {row.make} {row.model}
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Rating
                                    value={row.averageRating}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                  />
                                  <Typography variant="body2">
                                    {row.averageRating.toFixed(1)}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">{row.reviewCount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>

                {/* Monthly Utilisation by Car */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Monthly Utilisation by Car
                  </Typography>

                  {stats.reports.monthlyUtilizationByCar.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No booking activity yet.
                    </Typography>
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
                          {stats.reports.monthlyUtilizationByCar.map((row) => (
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
                              <TableCell align="right">{row.bookingCount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              </Stack>
            </Box>

            <Divider />

            <Typography variant="caption" color="text.secondary">
              Revenue calculated from CONFIRMED and COMPLETED bookings only.
              Cancellation rate = cancelled ÷ total bookings.
            </Typography>
          </Stack>
        )}
      </Box>
    </ProtectedRoute>
  );
}
