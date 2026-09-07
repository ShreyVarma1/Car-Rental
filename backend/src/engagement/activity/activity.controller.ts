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
} from "../../../generated/prisma/client";

import {
  ActivityService,
} from "./activity.service";

import {
  JwtAuthGuard,
} from "../../auth/guards/auth.guard";

import {
  RolesGuard,
} from "../../auth/guards/roles.guard";

import {
  Roles,
} from "../../auth/decorators/roles.decorators";

import {
  CurrentUser,
} from "../../auth/decorators/user.decorators";

import type {
  JwtPayload,
} from "../../auth/strategies/strategies";

@ApiTags("Activity Logs")
@ApiBearerAuth()
@Controller("activities")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
export class ActivityController {
  constructor(
    private readonly activityService:
      ActivityService,
  ) {}

  @Get("me")
  @ApiOperation({
    summary:
      "Get current user's activity logs",
  })
  @ApiResponse({
    status: 200,
    description:
      "User activity logs",
  })
  getMyActivities(
    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.activityService
      .getUserActivities(
        user.sub,
      );
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary:
      "Get all activity logs",
  })
  @ApiResponse({
    status: 200,
    description:
      "All activity logs",
  })
  getAllActivities() {
    return this.activityService
      .getAllActivities();
  }
}