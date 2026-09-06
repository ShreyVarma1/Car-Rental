"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { theme } from "@/theme/theme";
import { AuthProvider } from "@/context/auth_context";

const queryClient = new QueryClient();

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}