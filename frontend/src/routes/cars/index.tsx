"use client";

import {
  Box,
  Typography,
} from "@mui/material";

import { useCarFilterStore } from "@/stores/car_filter_store";

import { SearchCarsParams } from "@/types/car";

import {
  useCars,
} from "@/hooks/use_cars";

import CarSearchForm from "../../components/cars/car_search_form";
import CarList from "../../components/cars/car_list";

export default function CarsPage() {
  // Zustand: filters survive navigation back from /cars/[id]
  const { filters, setFilters, setPage } = useCarFilterStore();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCars(filters);

  function handleSearch(
    values: SearchCarsParams,
  ) {
    setFilters(values);
  }

  function handlePageChange(
    page: number,
  ) {
    setPage(page);
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Find Your Car
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Search available cars for your trip.
      </Typography>

      <CarSearchForm
        initialValues={filters}
        onSearch={handleSearch}
      />

      <CarList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        page={filters.page ?? 1}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}