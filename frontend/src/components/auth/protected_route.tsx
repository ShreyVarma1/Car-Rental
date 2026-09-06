"use client";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  ReactNode,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use_auth";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    user,
    isLoading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");

      return;
    }

    if (
      allowedRoles &&
      user &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/dashboard");
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    allowedRoles,
    router,
  ]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}