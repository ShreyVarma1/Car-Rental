export interface PaymentResult {
  success: boolean;
  transactionId: string;
}

export interface PaymentProvider {
  charge(
    amount: number,
  ): Promise<PaymentResult>;
}