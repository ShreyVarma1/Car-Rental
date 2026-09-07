import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import {
  PaymentProvider,
  PaymentResult,
} from "./payment.provider";

@Injectable()
export class MockPaymentProvider
  implements PaymentProvider
{
  async charge(
    _amount: number,
  ): Promise<PaymentResult> {
    return {
      success: true,
      transactionId: `MOCK-${randomUUID()}`,
    };
  }
}