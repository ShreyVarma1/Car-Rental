"use client";

import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";

import {
  Car,
} from "@/types/car";

interface CarCardProps {
  car: Car;
}

export default function CarCard({
  car,
}: CarCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            {car.make} {car.model}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {car.year} • {car.type}
          </Typography>

          <Typography>
            {car.transmission} •{" "}
            {car.fuel}
          </Typography>

          <Typography>
            {car.seats} seats
          </Typography>

          <Typography>
            📍 {car.city}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            ₹{Number(
              car.pricePerDay,
            ).toLocaleString("en-IN")}
            /day
          </Typography>

          <Button
            component={Link}
            href={`/cars/${car.id}`}
            variant="contained"
            sx={{
              mt: 1,
            }}
          >
            View Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}