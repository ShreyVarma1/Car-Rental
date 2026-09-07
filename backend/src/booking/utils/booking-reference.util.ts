import { randomBytes } from "crypto";

export function generateBookingReference(): string {
  const randomPart = randomBytes(5)
    .toString("hex")
    .toUpperCase();

  return `CR-${Date.now()}-${randomPart}`;
}