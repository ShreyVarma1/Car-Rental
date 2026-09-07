import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import type { PaymentProvider } from "./payment.provider";

@Injectable()
export class PaymentService {
  constructor(
    @Inject("PaymentProvider")
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async processPayment(
    amount: number,
  ) {
    const result =
      await this.paymentProvider.charge(
        amount,
      );

    if (!result.success) {
      throw new InternalServerErrorException(
        "Payment failed",
      );
    }

    return result;
  }
}