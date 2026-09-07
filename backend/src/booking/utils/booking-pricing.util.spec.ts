import { Prisma } from "../../../generated/prisma/client";
import { describe, expect, it } from "@jest/globals";

import {
  calculateBookingPricing,
} from "./booking-pricing.util";

describe("calculateBookingPricing", () => {
  it("should calculate car, add-on, tax and total correctly", () => {
    const result =
      calculateBookingPricing({
        carPricePerDay:
          new Prisma.Decimal(2500),

        days: 3,

        addOnPricesPerDay: [
          new Prisma.Decimal(200),
          new Prisma.Decimal(100),
        ],

        taxRate: 0.18,
      });

    expect(
      result.carSubtotal.toNumber(),
    ).toBe(7500);

    expect(
      result.addOnsTotal.toNumber(),
    ).toBe(900);

    expect(
      result.subtotal.toNumber(),
    ).toBe(8400);

    expect(
      result.tax.toNumber(),
    ).toBe(1512);

    expect(
      result.totalAmount.toNumber(),
    ).toBe(9912);
  });

  it("should calculate correctly when no add-ons are selected", () => {
    const result =
      calculateBookingPricing({
        carPricePerDay:
          new Prisma.Decimal(2000),

        days: 2,

        addOnPricesPerDay: [],

        taxRate: 0.18,
      });

    expect(
      result.carSubtotal.toNumber(),
    ).toBe(4000);

    expect(
      result.addOnsTotal.toNumber(),
    ).toBe(0);

    expect(
      result.subtotal.toNumber(),
    ).toBe(4000);

    expect(
      result.tax.toNumber(),
    ).toBe(720);

    expect(
      result.totalAmount.toNumber(),
    ).toBe(4720);
  });
});