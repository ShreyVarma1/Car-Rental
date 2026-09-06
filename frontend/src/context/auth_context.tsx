"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  refreshAccessToken as refreshRequest,
  register as registerRequest,
} from "@/services/auth_services";

import {
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (
    data: LoginRequest,
  ) => Promise<void>;

  register: (
    data: RegisterRequest,
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshAccessToken: () => Promise<string>;
}

export const AuthContext =
  createContext<AuthContextValue | null>(
    null,
  );

let refreshPromise:
  | Promise<string>
  | null = null;

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] =
    useState<User | null>(null);

  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      await refreshAccessToken();
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshAccessToken(): Promise<string> {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise =
      refreshRequest()
        .then((response) => {
          setAccessToken(
            response.accessToken,
          );

          setUser(response.user);

          return response.accessToken;
        })
        .catch((error) => {
          setAccessToken(null);
          setUser(null);

          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });

    return refreshPromise;
  }

  async function login(
    data: LoginRequest,
  ) {
    const response =
      await loginRequest(data);

    setAccessToken(
      response.accessToken,
    );

    setUser(response.user);
  }

  async function register(
    data: RegisterRequest,
  ) {
    await registerRequest(data);
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,

        isAuthenticated:
          Boolean(
            accessToken && user,
          ),

        login,
        register,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}