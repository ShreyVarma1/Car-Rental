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
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use_auth";
import { ApiError } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({
        name,
        email,
        password,
        phone: phone || undefined,
        drivingLicense: drivingLicense || undefined,
      });

      router.replace("/login");
    } catch (err) {
      if (err instanceof ApiError) {
        // Show the exact message from backend (e.g. validation errors)
        setError(err.message);
      } else {
        setError("Unable to register. Please try again.");
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
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 500 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Create Account
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Register as a renter. Owners and admins are assigned by an
                administrator.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  helperText="Minimum 8 characters"
                />

                <TextField
                  label="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  helperText="Indian number — e.g. 9876543210 or +919876543210"
                />

                <TextField
                  label="Driving License (optional)"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value)}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Creating account..." : "Register"}
                </Button>
              </Stack>
            </Box>

            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login">Login</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
