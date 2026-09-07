"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { FormEvent, useState, useEffect } from "react"; // useEffect is imported
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use_auth";
import { ApiError } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    isAuthenticated,
    isLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. ADD THIS STATE TO TRACK IF WE ARE ON THE CLIENT
  const [isMounted, setIsMounted] = useState(false);

  // 2. ADD THIS EFFECT TO TRIGGER MOUNTING
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isMounted, isLoading, isAuthenticated, router]);

  // 3. ADD THIS CONDITION FIRST TO PREVENT SSR MISMATCH
  if (!isMounted) {
    return null;
  }

  // Now these client-only state checks are completely safe!
  if (isLoading || isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });

      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError(
          "Unable to login. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                Login
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Sign in to your car rental account.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  required
                  fullWidth
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  required
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting
                    ? "Logging in..."
                    : "Login"}
                </Button>
              </Stack>
            </Box>

            <Typography
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Don't have an account?{" "}
              <Link href="/register">
                Register
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
