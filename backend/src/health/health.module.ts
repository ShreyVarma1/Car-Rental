import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma_services";
import { DATABASE_SERVICE } from "../common/constants/database.constants";

import { HealthController } from "./health.controllers";
import { HealthService } from "./health.services";

@Module({
  controllers: [HealthController],

  providers: [
    PrismaService,
    HealthService,
    {
      provide: DATABASE_SERVICE,
      useExisting: PrismaService,
    },
  ],
})
export class HealthModule {}