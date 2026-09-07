import { Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";
import NewBookingPage from "@/routes/bookings/new";

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      }
    >
      <NewBookingPage />
    </Suspense>
  );
}
