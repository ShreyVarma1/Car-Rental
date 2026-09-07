"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { FormEvent, useState } from "react";

import ProtectedRoute from "@/components/auth/protected_route";

import {
  useAdminAddOns,
  useCreateAdminAddOn,
  useUpdateAdminAddOn,
  useDeleteAdminAddOn,
} from "@/hooks/use_admin";

import { AddOn } from "@/types/addon";
import { ApiError } from "@/services/api";

interface AddOnFormData {
  name: string;
  description: string;
  pricePerDay: string;
}

const defaultForm: AddOnFormData = {
  name: "",
  description: "",
  pricePerDay: "",
};

export default function AdminAddOnsPage() {
  const { data: addOns, isLoading, isError, error } = useAdminAddOns();
  const createAddOn = useCreateAdminAddOn();
  const updateAddOn = useUpdateAdminAddOn();
  const deleteAddOn = useDeleteAdminAddOn();

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState<AddOnFormData>(defaultForm);
  const [formError, setFormError] = useState("");

  function handleField(field: keyof AddOnFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    try {
      await createAddOn.mutateAsync({
        name: form.name,
        description: form.description || undefined,
        pricePerDay: Number(form.pricePerDay),
      });

      setCreateOpen(false);
      setForm(defaultForm);
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError("Unable to create add-on. Please try again.");
      }
    }
  }

  async function handleToggle(addon: AddOn) {
    updateAddOn.mutate({ id: addon.id, data: { isActive: !addon.isActive } });
  }

  async function handleDelete(addon: AddOn) {
    if (!confirm(`Delete add-on "${addon.name}"?`)) return;
    deleteAddOn.mutate(addon.id);
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
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
            Manage Add-ons
          </Typography>

          <Button variant="contained" onClick={() => setCreateOpen(true)}>
            + Add New
          </Button>
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError ? error.message : "Unable to load add-ons."}
          </Alert>
        )}

        {addOns && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price/Day</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Active</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {addOns.map((addon) => (
                  <TableRow key={addon.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {addon.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {addon.description ?? "—"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      ₹{Number(addon.pricePerDay).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Switch
                          size="small"
                          checked={addon.isActive}
                          onChange={() => handleToggle(addon)}
                          disabled={updateAddOn.isPending}
                        />
                        <Chip
                          label={addon.isActive ? "Active" : "Inactive"}
                          color={addon.isActive ? "success" : "default"}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(addon)}
                        disabled={deleteAddOn.isPending}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && addOns?.length === 0 && (
          <Alert severity="info">No add-ons found.</Alert>
        )}

        {/* Create Dialog */}
        <Dialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Create Add-on</DialogTitle>

          <Box component="form" onSubmit={handleCreate}>
            <DialogContent>
              <Stack spacing={2}>
                {formError && (
                  <Alert severity="error">{formError}</Alert>
                )}

                <TextField
                  label="Name"
                  value={form.name}
                  onChange={(e) => handleField("name", e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={form.description}
                  onChange={(e) => handleField("description", e.target.value)}
                  multiline
                  rows={2}
                  fullWidth
                />

                <TextField
                  label="Price Per Day (₹)"
                  type="number"
                  value={form.pricePerDay}
                  onChange={(e) => handleField("pricePerDay", e.target.value)}
                  required
                  fullWidth
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setCreateOpen(false)}>Cancel</Button>

              <Button
                type="submit"
                variant="contained"
                disabled={createAddOn.isPending}
              >
                {createAddOn.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </ProtectedRoute>
  );
}
