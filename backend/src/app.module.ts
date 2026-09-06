import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { PrismaModule } from "./prisma/prisma_module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";

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

        REFRESH_TOKEN_EXPIRES_DAYS: Joi.number()
          .integer()
          .positive()
          .default(7),

        DATABASE_URL: Joi.string()
          .uri()
          .required(),
      }),
    }),

    PrismaModule,
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}