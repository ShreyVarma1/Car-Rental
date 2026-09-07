"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Rating,
  Stack,
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
