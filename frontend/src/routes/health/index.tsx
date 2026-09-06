"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useHealth } from "@/hooks/use_health";

export default function HealthPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useHealth();

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Backend Connection
      </Typography>

      <Typography sx={{ mt: 2 }}>
        API Status: {data?.status}
      </Typography>

      <Typography>
        Database: {data?.database}
      </Typography>
    </Box>
  );
}