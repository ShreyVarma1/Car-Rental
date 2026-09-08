"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useCar } from "@/hooks/use_cars";
import { useCarReviews } from "@/hooks/use_reviews";
import { useAuth } from "@/hooks/use_auth";

import CarImage from "@/components/cars/car_image";

function CarGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);

  const activeSrc = images[selected];

  return (
    <Stack spacing={1}>
      <CarImage
        src={activeSrc}
        alt={alt}
        height={320}
        borderRadius={2}
      />

      {images.length > 1 && (
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
          {images.map((src, index) => (
            <Box
              key={src + index}
              onClick={() => setSelected(index)}
              sx={{
                width: 88,
                flexShrink: 0,
                cursor: "pointer",
                opacity: index === selected ? 1 : 0.6,
                border: index === selected ? "2px solid" : "2px solid transparent",
                borderColor:
                  index === selected ? "primary.main" : "transparent",
                borderRadius: 1,
              }}
            >
              <CarImage src={src} alt={`${alt} thumbnail ${index + 1}`} height={64} borderRadius={1} />
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}

export default function CarDetailsPage() {
  const params = useParams();

  const id =
    typeof params.id === "string" ? params.id : "";

  const { data: car, isLoading, isError, error } = useCar(id);
  const { data: reviews } = useCarReviews(id);
  const { user } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !car) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error?.message ?? "Car not found."}
        </Alert>
      </Box>
    );
  }

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 2 }}>
        <Button component={Link} href="/cars" variant="text" size="small">
          ← Back to Cars
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <CarGallery
          images={car.images ?? []}
          alt={`${car.make} ${car.model}`}
        />
      </Box>

      <Stack spacing={4}>
        {/* Main Details Card */}
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {car.make} {car.model}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {car.year} • {car.type}
                </Typography>

                {avgRating !== null && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <Rating value={avgRating} readOnly precision={0.5} size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {avgRating.toFixed(1)} ({reviews!.length} review
                      {reviews!.length !== 1 ? "s" : ""})
                    </Typography>
                  </Box>
                )}
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                ₹{Number(car.pricePerDay).toLocaleString("en-IN")}
                <Typography component="span" variant="body1" color="text.secondary">
                  /day
                </Typography>
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
                gap: 2,
                mb: 3,
              }}
            >
              {[
                { label: "City", value: car.city },
                { label: "Seats", value: `${car.seats} seats` },
                { label: "Transmission", value: car.transmission },
                { label: "Fuel", value: car.fuel },
                { label: "Type", value: car.type },
                {
                  label: "Owner",
                  value: car.owner?.name ?? "—",
                },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Chip label={car.type} size="small" />
              <Chip label={car.transmission} size="small" />
              <Chip label={car.fuel} size="small" />
            </Box>

            {user?.role === "RENTER" && (
              <Button
                component={Link}
                href={`/bookings/new?carId=${car.id}`}
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
              >
                Book This Car
              </Button>
            )}

            {!user && (
              <Button
                component={Link}
                href={`/login`}
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
              >
                Login to Book
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Reviews Section */}
        {reviews && reviews.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Reviews
            </Typography>

            <Stack spacing={2}>
              {reviews.map((review) => (
                <Card key={review.id} variant="outlined">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                        {(review.renter?.name ?? "U")[0].toUpperCase()}
                      </Avatar>

                      <Box sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {review.renter?.name ?? "Renter"}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString("en-IN")}
                          </Typography>
                        </Box>

                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                          sx={{ my: 0.5 }}
                        />

                        {review.comment && (
                          <Typography variant="body2" color="text.secondary">
                            {review.comment}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {reviews && reviews.length === 0 && (
          <Typography color="text.secondary" variant="body2">
            No reviews yet for this car.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
