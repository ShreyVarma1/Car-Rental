import {
  hasDateRangeOverlap,
} from "./availability.util";
import { describe, expect, it } from "@jest/globals";



describe("hasDateRangeOverlap", () => {
  it("should detect overlapping booking ranges", () => {
    const existingPickup =
      new Date("2030-01-10T10:00:00Z");

    const existingDropOff =
      new Date("2030-01-13T10:00:00Z");

    const requestedPickup =
      new Date("2030-01-12T10:00:00Z");

    const requestedDropOff =
      new Date("2030-01-15T10:00:00Z");

    expect(
      hasDateRangeOverlap(
        existingPickup,
        existingDropOff,
        requestedPickup,
        requestedDropOff,
      ),
    ).toBe(true);
  });

  it("should detect when requested range starts inside existing range", () => {
    const existingPickup =
      new Date("2030-01-10T10:00:00Z");

    const existingDropOff =
      new Date("2030-01-15T10:00:00Z");

    const requestedPickup =
      new Date("2030-01-12T10:00:00Z");

    const requestedDropOff =
      new Date("2030-01-13T10:00:00Z");

    expect(
      hasDateRangeOverlap(
        existingPickup,
        existingDropOff,
        requestedPickup,
        requestedDropOff,
      ),
    ).toBe(true);
  });

  it("should return false for separate booking ranges", () => {
    const existingPickup =
      new Date("2030-01-10T10:00:00Z");

    const existingDropOff =
      new Date("2030-01-13T10:00:00Z");

    const requestedPickup =
      new Date("2030-01-14T10:00:00Z");

    const requestedDropOff =
      new Date("2030-01-17T10:00:00Z");

    expect(
      hasDateRangeOverlap(
        existingPickup,
        existingDropOff,
        requestedPickup,
        requestedDropOff,
      ),
    ).toBe(false);
  });

  it("should allow adjacent bookings", () => {
    const existingPickup =
      new Date("2030-01-10T10:00:00Z");

    const existingDropOff =
      new Date("2030-01-13T10:00:00Z");

    const requestedPickup =
      new Date("2030-01-13T10:00:00Z");

    const requestedDropOff =
      new Date("2030-01-16T10:00:00Z");

    expect(
      hasDateRangeOverlap(
        existingPickup,
        existingDropOff,
        requestedPickup,
        requestedDropOff,
      ),
    ).toBe(false);
  });
});