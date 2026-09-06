import { Inject, Injectable } from "@nestjs/common";

import type { DatabaseService } from "../common/interfaces/database.interface";
import { DATABASE_SERVICE } from "../common/constants/database.constants";

@Injectable()
export class HealthService {
  constructor(
    @Inject(DATABASE_SERVICE)
    private readonly database: DatabaseService,
  ) {}

  async check() {
    await this.database.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}