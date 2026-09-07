"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";

import ProtectedRoute from "@/components/auth/protected_route";
import { useAuth } from "@/hooks/use_auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {user?.name}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {user?.email} &nbsp;·&nbsp; {user?.role}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {/* Common for all */}
          <DashCard
            title="Browse Cars"
            description="Search and filter available cars for rent."
            href="/cars"
            label="Go to Cars"
          />

          <DashCard
            title="Notifications"
            description="View your latest notifications and updates."
            href="/notifications"
            label="View Notifications"
          />

          {/* Renter */}
          {user?.role === "RENTER" && (
            <DashCard
              title="My Bookings"
              description="View, track and manage your rental bookings."
              href="/bookings"
              label="My Bookings"
            />
          )}

          {/* Owner */}
          {user?.role === "OWNER" && (
            <>
              <DashCard
                title="My Car Listings"
                description="Manage your car listings and add new ones."
                href="/owner/cars"
                label="Manage Cars"
              />

              <DashCard
                title="Bookings on My Cars"
                description="See who has booked your cars."
                href="/owner/bookings"
                label="View Bookings"
              />
            </>
          )}

          {/* Admin */}
          {user?.role === "ADMIN" && (
            <>
              <DashCard
                title="Admin Dashboard"
                description="Platform-wide stats, revenue, and overview."
                href="/admin/dashboard"
                label="View Dashboard"
              />

              <DashCard
                title="Manage Users"
                description="View, update roles, and manage users."
                href="/admin/users"
                label="Manage Users"
              />

              <DashCard
                title="Manage Cars"
                description="Approve or reject car listings."
                href="/admin/cars"
                label="Manage Cars"
              />

              <DashCard
                title="All Bookings"
                description="View and manage platform bookings."
                href="/admin/bookings"
                label="View Bookings"
              />

              <DashCard
                title="Add-ons"
                description="Create and manage rental add-ons."
                href="/admin/addons"
                label="Manage Add-ons"
              />
            </>
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

function DashCard({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>

          <Button
            component={Link}
            href={href}
            variant="contained"
            size="small"
            fullWidth
          >
            {label}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
