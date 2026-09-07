"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { FormEvent, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ProtectedRoute from "@/components/auth/protected_route";

import { useCar } from "@/hooks/use_cars";
import { useAddOns } from "@/hooks/use_addons";
import { useCreateBooking } from "@/hooks/use_bookings";

import { ApiError } from "@/services/api";

export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId") ?? "";

  const { data: car, isLoading: carLoading } = useCar(carId);
  const { data: addOns, isLoading: addOnsLoading } = useAddOns();

  const createBooking = useCreateBooking();

  const [pickupAt, setPickupAt] = useState("");
  const [dropOffAt, setDropOffAt] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [error, setError] = useState("");

  const days = useMemo(() => {
    if (!pickupAt || !dropOffAt) return 0;
    const diff =
      new Date(dropOffAt).getTime() - new Date(pickupAt).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [pickupAt, dropOffAt]);

  const addOnsTotal = useMemo(() => {
    if (!addOns || days <= 0) return 0;
    return addOns
      .filter((a) => selectedAddOnIds.includes(a.id))
      .reduce((sum, a) => sum + Number(a.pricePerDay) * days, 0);
  }, [addOns, selectedAddOnIds, days]);

  const subtotal = useMemo(() => {
    if (!car || days <= 0) return 0;
    return Number(car.pricePerDay) * days + addOnsTotal;
  }, [car, days, addOnsTotal]);

  const tax = useMemo(() => subtotal * 0.18, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (days <= 0) {
      setError("Drop-off must be after pickup.");
      return;
    }

    try {
      const result = await createBooking.mutateAsync({
        carId,
        pickupAt: new Date(pickupAt).toISOString(),
        dropOffAt: new Date(dropOffAt).toISOString(),
        addOnIds: selectedAddOnIds,
      });

      router.replace(`/bookings/${result.booking.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to create booking. Please try again.");
      }
    }
  }

  if (carLoading || addOnsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!car) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Car not found.</Alert>
      </Box>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["RENTER"]}>
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Book a Car
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Car Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {car.make} {car.model}
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {car.year} • {car.type} • {car.transmission}
              </Typography>

              <Stack spacing={1}>
                <Typography>📍 {car.city}</Typography>
                <Typography>⛽ {car.fuel}</Typography>
                <Typography>💺 {car.seats} seats</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                  ₹{Number(car.pricePerDay).toLocaleString("en-IN")} / day
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Pickup Date & Time"
                type="datetime-local"
                value={pickupAt}
                onChange={(e) => setPickupAt(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                required
                fullWidth
              />

              <TextField
                label="Drop-off Date & Time"
                type="datetime-local"
                value={dropOffAt}
                onChange={(e) => setDropOffAt(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                required
                fullWidth
              />

              {addOns && addOns.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Add-ons
                  </Typography>

                  {addOns.map((addon) => (
                    <FormControlLabel
                      key={addon.id}
                      control={
                        <Checkbox
                          checked={selectedAddOnIds.includes(addon.id)}
                          onChange={() => toggleAddOn(addon.id)}
                        />
                      }
                      label={`${addon.name} — ₹${Number(addon.pricePerDay).toLocaleString("en-IN")}/day`}
                    />
                  ))}
                </Box>
              )}

              {days > 0 && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      Price Summary
                    </Typography>

                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {days} day{days !== 1 ? "s" : ""} × ₹
                        {Number(car.pricePerDay).toLocaleString("en-IN")} ={" "}
                        ₹
                        {(
                          Number(car.pricePerDay) * days
                        ).toLocaleString("en-IN")}
                      </Typography>

                      {addOnsTotal > 0 && (
                        <Typography variant="body2">
                          Add-ons: ₹{addOnsTotal.toLocaleString("en-IN")}
                        </Typography>
                      )}

                      <Divider />

                      <Typography variant="body2">
                        Subtotal: ₹{subtotal.toLocaleString("en-IN")}
                      </Typography>

                      <Typography variant="body2">
                        Tax (18%): ₹{Math.round(tax).toLocaleString("en-IN")}
                      </Typography>

                      <Divider />

                      <Typography sx={{ fontWeight: 700 }}>
                        Total: ₹{Math.round(total).toLocaleString("en-IN")}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={createBooking.isPending}
                fullWidth
              >
                {createBooking.isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
