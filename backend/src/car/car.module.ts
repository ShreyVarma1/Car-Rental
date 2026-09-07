import {
  Module,
} from "@nestjs/common";

import {
  CarController,
} from "./car.controller";

import {
  AdminCarController,
} from "./admin-car.controller";

import {
  CarService,
} from "./car.services";

import {
  CarRepository,
} from "./car.repository";

import {
  EngagementModule,
} from "../engagement/engagement.module";

@Module({
  imports: [
    EngagementModule,
  ],

  controllers: [
    CarController,

    AdminCarController,
  ],

  providers: [
    CarService,

    CarRepository,
  ],

  exports: [
    CarService,
  ],
})
export class CarModule {}