import {
  Module,
} from "@nestjs/common";

import {
  BookingController,
} from "./booking.controller";

import {
  OwnerBookingController,
} from "./owner-booking.controller";

import {
  AdminBookingController,
} from "./admin-booking.controller";

import {
  BookingService,
} from "./booking.service";

import {
  BookingRepository,
} from "./booking.repository";

import {
  PaymentService,
} from "./payment/payment.services";

import {
  MockPaymentProvider,
} from "./payment/mock-payment.provider";

import {
  EngagementModule,
} from "../engagement/engagement.module";

@Module({
  imports: [
    EngagementModule,
  ],

  controllers: [
    BookingController,

    OwnerBookingController,

    AdminBookingController,
  ],

  providers: [
    BookingService,

    BookingRepository,

    PaymentService,

    {
      provide: "PaymentProvider",
      useClass:
        MockPaymentProvider,
    },
  ],

  exports: [
    BookingService,
  ],
})
export class BookingModule {}