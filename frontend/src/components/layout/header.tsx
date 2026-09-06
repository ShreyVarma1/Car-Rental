"use client";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use_auth";

export default function Header() {
  const router = useRouter();

  const {
    user,
    isLoading,
    isAuthenticated,
    logout,
  } = useAuth();

  async function handleLogout() {
    await logout();

    router.replace("/login");
  }

  if (isLoading) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/dashboard"
          sx={{
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          Car Rental
        </Typography>

        {!isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              href="/login"
            >
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              href="/register"
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>
              {user?.name}
            </Typography>

            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}