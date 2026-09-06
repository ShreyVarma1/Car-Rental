export type UserRole =
  | "RENTER"
  | "OWNER"
  | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  drivingLicense: string | null;
  role: UserRole;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  drivingLicense?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
  user: User;
}