import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { PrismaModule } from "./prisma/prisma_module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),

        FRONTEND_URL: Joi.string()
          .uri()
          .required(),

        JWT_SECRET: Joi.string()
          .min(16)
          .required(),

        JWT_EXPIRES_IN: Joi.string()
          .default("15m"),

        DATABASE_URL: Joi.string()
          .uri()
          .required(),
      }),
    }),

    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}