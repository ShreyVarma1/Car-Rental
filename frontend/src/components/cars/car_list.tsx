"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import {
  ApiError,
} from "@/services/api";

import {
  CarSearchResponse,
} from "@/types/car";

import CarCard from "./car_card";

interface CarListProps {
  data?: CarSearchResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  page: number;
  onPageChange: (
    page: number,
  ) => void;
}

export default function CarList({
  data,
  isLoading,
  isError,
  error,
  page,
  onPageChange,
}: CarListProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error instanceof ApiError
          ? error.message
          : "Unable to load cars."}
      </Alert>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Alert severity="info">
        No cars found for the selected
        search criteria.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        {data.pagination.total} cars found
      </Typography>

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
        {data.data.map((car) => (
          <CarCard
            key={car.id}
            car={car}
          />
        ))}
      </Box>

      {data.pagination.totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={page}
            count={
              data.pagination.totalPages
            }
            onChange={(_, value) =>
              onPageChange(value)
            }
            color="primary"
          />
        </Box>
      )}
    </Stack>
  );
}