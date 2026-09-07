import { Test, TestingModule } from "@nestjs/testing";
import { InternalServerErrorException } from "@nestjs/common";
import { PaymentService } from "./payment.services";
import { MockPaymentProvider } from "./mock-payment.provider";
import type { PaymentProvider } from "./payment.provider";

describe("PaymentService", () => {
  let service: PaymentService;
  let provider: PaymentProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: "PaymentProvider",
          useClass: MockPaymentProvider,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    provider = module.get<PaymentProvider>("PaymentProvider");
  });

  it("should be defined and resolve PaymentProvider dependency", () => {
    expect(service).toBeDefined();
    expect(provider).toBeDefined();
  });

  it("should process payment successfully", async () => {
    const result = await service.processPayment(100);
    expect(result.success).toBe(true);
    expect(result.transactionId).toMatch(/^MOCK-/);
  });

  it("should throw InternalServerErrorException if payment fails", async () => {
    jest.spyOn(provider, "charge").mockResolvedValueOnce({
      success: false,
      transactionId: "FAIL-123",
    });

    await expect(service.processPayment(50)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
