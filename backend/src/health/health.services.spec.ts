import { HealthService } from "./health.services";
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";

describe("HealthService", () => {
  let healthService: HealthService;

  const databaseMock = {
    $queryRaw: jest.fn(async () => [{ "?column?": 1 }]),
  };

  beforeEach(() => {
    databaseMock.$queryRaw.mockResolvedValue([
      {
        "?column?": 1,
      },
    ]);

    healthService = new HealthService(
      databaseMock as unknown as ConstructorParameters<typeof HealthService>[0],
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(healthService).toBeDefined();
  });

  it("should confirm database connectivity", async () => {
    const result = await healthService.check();

    expect(databaseMock.$queryRaw).toHaveBeenCalled();

    expect(result.status).toBe("ok");
    expect(result.database).toBe("connected");
  });
});