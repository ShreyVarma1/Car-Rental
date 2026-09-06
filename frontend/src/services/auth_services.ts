import { apiRequest } from "./api";

import {
  AuthResponse,
  LoginRequest,
  RefreshResponse,
  RegisterRequest,
  User,
} from "@/types/auth";

export function register(
  data: RegisterRequest,
) {
  return apiRequest<{
    message: string;
    user: User;
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(
  data: LoginRequest,
) {
  return apiRequest<AuthResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export function refreshAccessToken() {
  return apiRequest<RefreshResponse>(
    "/auth/refresh",
    {
      method: "POST",
    },
  );
}

export function logout() {
  return apiRequest<{
    message: string;
  }>("/auth/logout", {
    method: "POST",
  });
}

export function logoutAll() {
  return apiRequest<{
    message: string;
  }>("/auth/logout-all", {
    method: "POST",
  });
}

export function getCurrentUser(
  accessToken: string,
) {
  return apiRequest<User>("/auth/me", {
    method: "GET",

    headers: {
      Authorization:
        `Bearer ${accessToken}`,
    },
  });
}