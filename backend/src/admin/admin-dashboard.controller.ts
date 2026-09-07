import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  UserRole,
} from "../../generated/prisma/client";

import {
  AdminDashboardService,
} from "./admin-dashboard.services";

import {
  JwtAuthGuard,
} from "../auth/guards/auth.guard";

import {
  RolesGuard,
} from "../auth/guards/roles.guard";

import {
  Roles,
} from "../auth/decorators/roles.decorators";

@ApiTags("Admin Dashboard")
@ApiBearerAuth()
@Controller("admin/dashboard")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.ADMIN)
export class AdminDashboardController {
  constructor(
    private readonly dashboardService: AdminDashboardService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get admin dashboard statistics",
    description:
      "Returns platform-wide user, car, booking, revenue and performance statistics. Admin only.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Dashboard statistics returned successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can access the dashboard.",
  })
  getDashboard() {
    return this.dashboardService
      .getDashboard();
  }
}