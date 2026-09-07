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
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";

import ProtectedRoute from "@/components/auth/protected_route";

import {
  useAdminUsers,
  useUpdateUserRole,
  useDeleteAdminUser,
} from "@/hooks/use_admin";

import { AdminUser } from "@/types/admin";
import { ApiError } from "@/services/api";

type UserRole = "RENTER" | "OWNER" | "ADMIN";

function roleColor(
  role: UserRole,
): "primary" | "secondary" | "error" {
  if (role === "ADMIN") return "error";
  if (role === "OWNER") return "secondary";
  return "primary";
}

export default function AdminUsersPage() {
  const { data: users, isLoading, isError, error } = useAdminUsers();
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteAdminUser();

  const [roleDialog, setRoleDialog] =
    useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] =
    useState<UserRole>("RENTER");

  function openRoleDialog(user: AdminUser) {
    setRoleDialog(user);
    setSelectedRole(user.role);
  }

  async function handleRoleUpdate() {
    if (!roleDialog) return;
    await updateRole.mutateAsync({
      id: roleDialog.id,
      role: selectedRole,
    });
    setRoleDialog(null);
  }

  async function handleDelete(user: AdminUser) {
    if (
      !confirm(
        `Deactivate user ${user.name}? This will revoke all their sessions.`,
      )
    ) {
      return;
    }
    deleteUser.mutate(user.id);
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Manage Users
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError
              ? error.message
              : "Unable to load users."}
          </Alert>
        )}

        {users && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Joined</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                      >
                        {user.name}
                      </Typography>
                      {user.drivingLicense && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          DL: {user.drivingLicense}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.phone ?? "—"}</TableCell>

                    <TableCell>
                      <Chip
                        label={user.role}
                        color={roleColor(user.role)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(user.createdAt).toLocaleDateString(
                          "en-IN",
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => openRoleDialog(user)}
                        >
                          Role
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(user)}
                          disabled={deleteUser.isPending}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!isLoading && users?.length === 0 && (
          <Alert severity="info">No users found.</Alert>
        )}
      </Box>

      {/* Role Dialog */}
      <Dialog
        open={Boolean(roleDialog)}
        onClose={() => setRoleDialog(null)}
      >
        <DialogTitle>Change Role — {roleDialog?.name}</DialogTitle>

        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              label="Role"
              onChange={(e) =>
                setSelectedRole(e.target.value as UserRole)
              }
            >
              <MenuItem value="RENTER">Renter</MenuItem>
              <MenuItem value="OWNER">Owner</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRoleDialog(null)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleRoleUpdate}
            disabled={updateRole.isPending}
          >
            {updateRole.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </ProtectedRoute>
  );
}
