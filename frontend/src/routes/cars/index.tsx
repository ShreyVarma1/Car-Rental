"use client";

import {
  Box,
  Typography,
} from "@mui/material";

import {
  useState,
} from "react";

import {
  SearchCarsParams,
} from "@/types/car";

import {
  useCars,
} from "@/hooks/use_cars";

import CarSearchForm from "../../components/cars/car_search_form";
import CarList from "../../components/cars/car_list";

export default function CarsPage() {
  const [filters, setFilters] =
    useState<SearchCarsParams>({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCars(filters);

  function handleSearch(
    values: SearchCarsParams,
  ) {
    setFilters({
      ...values,
      page: 1,
      limit: 10,
    });
  }

  function handlePageChange(
    page: number,
  ) {
    setFilters((current) => ({
      ...current,
      page,
    }));
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