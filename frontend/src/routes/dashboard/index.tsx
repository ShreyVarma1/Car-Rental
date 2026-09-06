"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/auth/protected_route";
import { useAuth } from "@/hooks/use_auth";

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  async function handleLogout() {
    await logout();

    router.replace("/login");
  }

  return (
    <ProtectedRoute>
      <Box sx={{ p: 4 }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                Welcome, {user?.name}
              </Typography>

              <Typography>
                Email: {user?.email}
              </Typography>

              <Typography>
                Role: {user?.role}
              </Typography>

              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ width: "fit-content" }}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </ProtectedRoute>
  );
}