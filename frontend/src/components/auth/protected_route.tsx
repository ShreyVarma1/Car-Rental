"use client";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  ReactNode,
  useEffect,
  useState, // Added useState
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

  // 1. Add state to ensure we only render layout dependencies on the client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Wait until mounted and loading finishes before processing redirect hooks
    if (!isMounted || isLoading) {
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
    isMounted, // Added isMounted dependency
    isLoading,
    isAuthenticated,
    user,
    allowedRoles,
    router,
  ]);

  // 2. Return an empty layout on server pre-rendering to match baseline client HTML structural rules
  if (!isMounted) {
    return null;
  }

  // Now client-only conditional nodes are clean and safe!
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
