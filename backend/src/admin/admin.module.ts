import {
  Module,
} from "@nestjs/common";

import {
  AdminDashboardController,
} from "./admin-dashboard.controller";

import {
  AdminDashboardService,
} from "./admin-dashboard.services";

import {
  AdminDashboardRepository,
} from "./admin-dashboard.repository";

@Module({
  controllers: [
    AdminDashboardController,
  ],

  providers: [
    AdminDashboardService,
    AdminDashboardRepository,
  ],
})
export class AdminModule {}