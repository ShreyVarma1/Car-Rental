"use client";

import {Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Dialog,
  DialogActions,DialogContent, DialogTitle, FormControl,InputLabel, 
  MenuItem, Select, Stack, TextField, Typography,} from "@mui/material";

import { FormEvent, useState } from "react";

import ProtectedRoute from "@/components/auth/protected_route";

import {
  useOwnerCars,
  useCreateCar,
  useUpdateCar,
  useDeleteCar,
} from "@/hooks/use_owner_cars";

import { Car, CarStatus } from "@/types/car";
import { ApiError } from "@/services/api";

function statusColor(
  status: CarStatus,
): "success" | "warning" | "error" {
  if (status === "APPROVED") return "success";
  if (status === "PENDING") return "warning";
  return "error";
}

interface CarFormData {
  make: string;
  model: string;
  year: string;
  type: string;
  transmission: string;
  fuel: string;
  seats: string;
  city: string;
  pricePerDay: string;
}

const defaultForm: CarFormData = {
  make: "",
  model: "",
  year: "",
  type: "",
  transmission: "",
  fuel: "",
  seats: "",
  city: "",
  pricePerDay: "",
};

function carToForm(car: Car): CarFormData {
  return {
    make: car.make,
    model: car.model,
    year: String(car.year),
    type: car.type,
    transmission: car.transmission,
    fuel: car.fuel,
    seats: String(car.seats),
    city: car.city,
    pricePerDay: String(car.pricePerDay),
  };
}

const CAR_TYPES = [
  "HATCHBACK",
  "SEDAN",
  "SUV",
  "MUV",
  "LUXURY",
  "ELECTRIC",
] as const;

const FUEL_TYPES = [
  "PETROL",
  "DIESEL",
  "ELECTRIC",
  "HYBRID",
] as const;

// ─── Shared form fields ────────────────────────────────────────────────────────

function CarFormFields({
  form,
  onChange,
}: {
  form: CarFormData;
  onChange: (field: keyof CarFormData, value: string) => void;
}) {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Make"
          value={form.make}
          onChange={(e) => onChange("make", e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Model"
          value={form.model}
          onChange={(e) => onChange("model", e.target.value)}
          required
          fullWidth
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Year"
          type="number"
          value={form.year}
          onChange={(e) => onChange("year", e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Seats"
          type="number"
          value={form.seats}
          onChange={(e) => onChange("seats", e.target.value)}
          required
          fullWidth
        />
      </Box>

      <FormControl required fullWidth>
        <InputLabel>Car Type</InputLabel>
        <Select
          value={form.type}
          label="Car Type"
          onChange={(e) => onChange("type", e.target.value)}
        >
          {CAR_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required fullWidth>
        <InputLabel>Transmission</InputLabel>
        <Select
          value={form.transmission}
          label="Transmission"
          onChange={(e) => onChange("transmission", e.target.value)}
        >
          <MenuItem value="MANUAL">Manual</MenuItem>
          <MenuItem value="AUTOMATIC">Automatic</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth>
        <InputLabel>Fuel</InputLabel>
        <Select
          value={form.fuel}
          label="Fuel"
          onChange={(e) => onChange("fuel", e.target.value)}
        >
          {FUEL_TYPES.map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="City"
        value={form.city}
        onChange={(e) => onChange("city", e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Price Per Day (₹)"
        type="number"
        value={form.pricePerDay}
        onChange={(e) => onChange("pricePerDay", e.target.value)}
        required
        fullWidth
      />
    </Stack>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function OwnerCarsPage() {
  const { data: cars, isLoading, isError, error } = useOwnerCars();
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const deleteCar = useDeleteCar();

  // Create dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CarFormData>(defaultForm);
  const [createError, setCreateError] = useState("");

  // Edit dialog
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [editForm, setEditForm] = useState<CarFormData>(defaultForm);
  const [editError, setEditError] = useState("");

  function handleCreateField(field: keyof CarFormData, value: string) {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleEditField(field: keyof CarFormData, value: string) {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }

  function openEdit(car: Car) {
    setEditCar(car);
    setEditForm(carToForm(car));
    setEditError("");
  }

  function buildPayload(form: CarFormData) {
    return {
      make: form.make,
      model: form.model,
      year: Number(form.year),
      type: form.type,
      transmission: form.transmission,
      fuel: form.fuel,
      seats: Number(form.seats),
      city: form.city,
      pricePerDay: Number(form.pricePerDay),
    };
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateError("");

    try {
      await createCar.mutateAsync(buildPayload(createForm));
      setCreateOpen(false);
      setCreateForm(defaultForm);
    } catch (err) {
      setCreateError(
        err instanceof ApiError
          ? err.message
          : "Unable to create listing. Please try again.",
      );
    }
  }

  async function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditError("");

    if (!editCar) return;

    try {
      await updateCar.mutateAsync({
        id: editCar.id,
        data: buildPayload(editForm),
      });
      setEditCar(null);
    } catch (err) {
      setEditError(
        err instanceof ApiError
          ? err.message
          : "Unable to update listing. Please try again.",
      );
    }
  }

  async function handleDelete(car: Car) {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;
    deleteCar.mutate(car.id);
  }

  return (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            My Car Listings
          </Typography>

          <Button variant="contained" onClick={() => setCreateOpen(true)}>
            + Add Car
          </Button>
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError
              ? error.message
              : "Unable to load cars."}
          </Alert>
        )}

        {!isLoading && cars?.length === 0 && (
          <Alert severity="info">
            You have no car listings yet. Click "+ Add Car" to create one.
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {cars?.map((car) => (
            <Card key={car.id}>
              <CardContent>
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {car.make} {car.model}
                    </Typography>

                    <Chip
                      label={car.status}
                      color={statusColor(car.status)}
                      size="small"
                    />
                  </Box>

                  <Typography color="text.secondary" variant="body2">
                    {car.year} • {car.type}
                  </Typography>

                  <Typography variant="body2">
                    {car.transmission} • {car.fuel} • {car.seats} seats
                  </Typography>

                  <Typography variant="body2">📍 {car.city}</Typography>

                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ₹{Number(car.pricePerDay).toLocaleString("en-IN")}/day
                  </Typography>

                  {car.status === "PENDING" && (
                    <Typography variant="caption" color="warning.main">
                      Awaiting admin approval
                    </Typography>
                  )}

                  {car.status === "REJECTED" && (
                    <Typography variant="caption" color="error.main">
                      Listing was rejected by admin
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => openEdit(car)}
                      fullWidth
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(car)}
                      disabled={deleteCar.isPending}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* ── Create Dialog ── */}
        <Dialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Car Listing</DialogTitle>

          <Box component="form" onSubmit={handleCreate}>
            <DialogContent>
              {createError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {createError}
                </Alert>
              )}

              <CarFormFields
                form={createForm}
                onChange={handleCreateField}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setCreateOpen(false)}>Cancel</Button>

              <Button
                type="submit"
                variant="contained"
                disabled={createCar.isPending}
              >
                {createCar.isPending ? "Creating..." : "Create Listing"}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* ── Edit Dialog ── */}
        <Dialog
          open={Boolean(editCar)}
          onClose={() => setEditCar(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Edit Car — {editCar?.make} {editCar?.model}
          </DialogTitle>

          <Box component="form" onSubmit={handleEdit}>
            <DialogContent>
              {editError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {editError}
                </Alert>
              )}

              <Alert severity="info" sx={{ mb: 2 }}>
                Saving changes will reset the listing to Pending status for
                admin re-approval.
              </Alert>

              <CarFormFields
                form={editForm}
                onChange={handleEditField}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setEditCar(null)}>Cancel</Button>

              <Button
                type="submit"
                variant="contained"
                disabled={updateCar.isPending}
              >
                {updateCar.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </ProtectedRoute>
  );
}
