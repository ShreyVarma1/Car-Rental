import { authenticatedRequest } from "./authenticated_api";

import { AdminDashboard, AdminUser } from "@/types/admin";
import { Car } from "@/types/car";
import { Booking } from "@/types/booking";
import { AddOn } from "@/types/addon";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function getAdminDashboard(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AdminDashboard>("/admin/dashboard", {
    accessToken,
    refreshAccessToken,
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function getAdminUsers(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AdminUser[]>("/admin/users", {
    accessToken,
    refreshAccessToken,
  });
}

export function getAdminUser(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AdminUser>(`/admin/users/${id}`, {
    accessToken,
    refreshAccessToken,
  });
}

export function updateUserRole(
  id: string,
  role: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AdminUser>(`/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
    accessToken,
    refreshAccessToken,
  });
}

export function deleteAdminUser(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<{ message: string }>(`/admin/users/${id}`, {
    method: "DELETE",
    accessToken,
    refreshAccessToken,
  });
}

// ─── Cars ─────────────────────────────────────────────────────────────────────

export function getAdminCars(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car[]>("/admin/cars", {
    accessToken,
    refreshAccessToken,
  });
}

export function approveAdminCar(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car>(`/admin/cars/${id}/approve`, {
    method: "PATCH",
    accessToken,
    refreshAccessToken,
  });
}

export function rejectAdminCar(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car>(`/admin/cars/${id}/reject`, {
    method: "PATCH",
    accessToken,
    refreshAccessToken,
  });
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export function getAdminBookings(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking[]>("/admin/bookings", {
    accessToken,
    refreshAccessToken,
  });
}

export function cancelAdminBooking(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Booking>(`/admin/bookings/${id}/cancel`, {
    method: "PATCH",
    accessToken,
    refreshAccessToken,
  });
}

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export function getAdminAddOns(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AddOn[]>("/addons/admin", {
    accessToken,
    refreshAccessToken,
  });
}

export function createAdminAddOn(
  data: { name: string; description?: string; pricePerDay: number },
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AddOn>("/addons", {
    method: "POST",
    body: JSON.stringify(data),
    accessToken,
    refreshAccessToken,
  });
}

export function updateAdminAddOn(
  id: string,
  data: { name?: string; description?: string; pricePerDay?: number; isActive?: boolean },
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<AddOn>(`/addons/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    accessToken,
    refreshAccessToken,
  });
}

export function deleteAdminAddOn(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<{ message: string }>(`/addons/${id}`, {
    method: "DELETE",
    accessToken,
    refreshAccessToken,
  });
}

// ─── Owner Cars ───────────────────────────────────────────────────────────────

export function createCar(
  data: object,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car>("/cars", {
    method: "POST",
    body: JSON.stringify(data),
    accessToken,
    refreshAccessToken,
  });
}

export function updateCar(
  id: string,
  data: object,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Car>(`/cars/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    accessToken,
    refreshAccessToken,
  });
}

export function deleteCar(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<{ message: string }>(`/cars/${id}`, {
    method: "DELETE",
    accessToken,
    refreshAccessToken,
  });
}
