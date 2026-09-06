"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use_auth";
import { ApiError } from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const { register } =
    useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [drivingLicense, setDrivingLicense] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await register({
        name,
        email,
        password,
        phone: phone || undefined,
        drivingLicense:
          drivingLicense || undefined,
      });

      router.replace("/login");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError(
          "Unable to register. Please try again.",
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
          maxWidth: 500,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                Create Account
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Create your car rental account.
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
                  label="Name"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value,
                    )
                  }
                  required
                  fullWidth
                />

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
                  helperText="Minimum 8 characters"
                  fullWidth
                />

                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value,
                    )
                  }
                  fullWidth
                />

                <TextField
                  label="Driving License"
                  value={drivingLicense}
                  onChange={(event) =>
                    setDrivingLicense(
                      event.target.value,
                    )
                  }
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
                    ? "Creating account..."
                    : "Register"}
                </Button>
              </Stack>
            </Box>

            <Typography
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Already have an account?{" "}
              <Link href="/login">
                Login
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}