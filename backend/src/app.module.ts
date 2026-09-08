import {Module,} from "@nestjs/common";
import {ConfigModule,} from "@nestjs/config";
import {ScheduleModule,} from "@nestjs/schedule";
import * as Joi from "joi";
import {PrismaModule,} from "./prisma/prisma_module";
import {HealthModule,} from "./health/health.module";
import {AuthModule,} from "./auth/auth.module";
import {EngagementModule,} from "./engagement/engagement.module";
import {CarModule,} from "./car/car.module";
import {AddOnModule,} from "./add-on/addon.module";
import {BookingModule,} from "./booking/booking.module";
import {AdminModule,} from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),

        FRONTEND_URL:
          Joi.string()
            .uri()
            .required(),

        JWT_SECRET:
          Joi.string()
            .min(16)
            .required(),

        JWT_EXPIRES_IN:
          Joi.string()
            .default("15m"),

        REFRESH_TOKEN_EXPIRES_DAYS:
          Joi.number()
            .integer()
            .positive()
            .default(7),

        MAX_RENTAL_DAYS:
          Joi.number()
            .integer()
            .positive()
            .default(30),

        CANCELLATION_WINDOW_HOURS:
          Joi.number()
            .integer()
            .min(0)
            .default(24),

        TAX_RATE:
          Joi.number()
            .min(0)
            .max(1)
            .default(0.18),

        DATABASE_URL:
          Joi.string()
            .uri()
            .required(),
      }),
    }),

    ScheduleModule.forRoot(),

    PrismaModule,
    HealthModule,
    AuthModule,
    CarModule,
    EngagementModule,
    AddOnModule,
    BookingModule,
    AdminModule,
  ],
})
export class AppModule {}