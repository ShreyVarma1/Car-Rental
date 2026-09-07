"use client";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/hooks/use_auth";
import { useNotifications } from "@/hooks/use_notifications";

function NavLinks({ role }: { role: string }) {
  if (role === "RENTER") {
    return (
      <>
        <Button color="inherit" component={Link} href="/cars">
          Browse Cars
        </Button>
        <Button color="inherit" component={Link} href="/bookings">
          My Bookings
        </Button>
      </>
    );
  }

  if (role === "OWNER") {
    return (
      <>
        <Button color="inherit" component={Link} href="/owner/cars">
          My Cars
        </Button>
        <Button color="inherit" component={Link} href="/owner/bookings">
          Bookings
        </Button>
      </>
    );
  }

  if (role === "ADMIN") {
    return (
      <>
        <Button color="inherit" component={Link} href="/admin/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} href="/admin/cars">
          Cars
        </Button>
        <Button color="inherit" component={Link} href="/admin/users">
          Users
        </Button>
        <Button color="inherit" component={Link} href="/admin/bookings">
          Bookings
        </Button>
        <Button color="inherit" component={Link} href="/admin/addons">
          Add-ons
        </Button>
      </>
    );
  }

  return null;
}

export default function Header() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const { data: notifications } = useNotifications();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const unreadCount =
    notifications?.filter((n) => !n.isRead).length ?? 0;

  async function handleLogout() {
    setAnchorEl(null);
    await logout();
    router.replace("/login");
  }

  if (isLoading) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Brand */}
        <Typography
          variant="h6"
          component={Link}
          href="/dashboard"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
            mr: 3,
          }}
        >
          CarRental
        </Typography>

        {/* Role nav links */}
        {isAuthenticated && user && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            <NavLinks role={user.role} />
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {!isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>

            <Button
              color="inherit"
              variant="outlined"
              component={Link}
              href="/register"
              sx={{ borderColor: "rgba(255,255,255,0.6)" }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Notifications bell */}
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                component={Link}
                href="/notifications"
              >
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User menu */}
            <Tooltip title={user?.name}>
              <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>

              <Divider />

              <MenuItem
                component={Link}
                href="/dashboard"
                onClick={() => setAnchorEl(null)}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                component={Link}
                href="/notifications"
                onClick={() => setAnchorEl(null)}
              >
                Notifications
                {unreadCount > 0 && ` (${unreadCount})`}
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
