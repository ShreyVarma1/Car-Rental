import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { MockPaymentProvider } from "./mock-payment.provider";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentProvider: MockPaymentProvider,
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