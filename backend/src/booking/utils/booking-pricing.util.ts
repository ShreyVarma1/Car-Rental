import { Prisma } from "../../../generated/prisma/client";

export interface BookingPricingInput {
  carPricePerDay: Prisma.Decimal;
  days: number;
  addOnPricesPerDay: Prisma.Decimal[];
  taxRate: number;
}

export interface BookingPricingResult {
  carSubtotal: Prisma.Decimal;
  addOnsTotal: Prisma.Decimal;
  subtotal: Prisma.Decimal;
  tax: Prisma.Decimal;
  totalAmount: Prisma.Decimal;
}

export function calculateBookingPricing(
  input: BookingPricingInput,
): BookingPricingResult {
  const carSubtotal =
    input.carPricePerDay.mul(input.days);

  const addOnsTotal =
    input.addOnPricesPerDay.reduce(
      (
        total,
        pricePerDay,
      ) =>
        total.add(
          pricePerDay.mul(input.days),
        ),
      new Prisma.Decimal(0),
    );

  const subtotal =
    carSubtotal.add(addOnsTotal);

  const tax =
    subtotal.mul(input.taxRate);

  const totalAmount =
    subtotal.add(tax);

  return {
    carSubtotal,
    addOnsTotal,
    subtotal,
    tax,
    totalAmount,
  };
}