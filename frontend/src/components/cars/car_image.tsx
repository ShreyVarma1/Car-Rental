"use client";

import { useState } from "react";

import {
  Box,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCarFilled";

interface CarImageProps {
  src?: string;
  alt: string;
  height?: number | string;
  borderRadius?: number | string;
}

/**
 * Renders a car photo with a graceful fallback (a simple
 * car icon on a muted background) when no image URL is
 * available yet, or when the given URL fails to load.
 */
export default function CarImage({
  src,
  alt,
  height = 180,
  borderRadius = 0,
}: CarImageProps) {
  const [failed, setFailed] = useState(false);

  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <Box
        sx={{
          height,
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
          color: "text.disabled",
        }}
      >
        <DirectionsCarIcon
          sx={{ fontSize: 48 }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      sx={{
        height,
        width: "100%",
        objectFit: "cover",
        borderRadius,
        display: "block",
      }}
    />
  );
}
