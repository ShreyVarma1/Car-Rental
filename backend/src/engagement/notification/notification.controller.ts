import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  NotificationService,
} from "./notification.service";

import {
  JwtAuthGuard,
} from "../../auth/guards/auth.guard";

import {
  CurrentUser,
} from "../../auth/decorators/user.decorators";

import type {
  JwtPayload,
} from "../../auth/strategies/strategies";

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService:
      NotificationService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get current user's notifications",
  })
  @ApiResponse({
    status: 200,
    description:
      "Notifications returned successfully",
  })
  getNotifications(
    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.notificationService
      .getUserNotifications(
        user.sub,
      );
  }

  @Patch(":id/read")
  @ApiOperation({
    summary:
      "Mark a notification as read",
  })
  @ApiParam({
    name: "id",
    description:
      "Notification UUID",
  })
  markAsRead(
    @Param("id")
    id: string,

    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.notificationService
      .markAsRead(
        id,
        user.sub,
      );
  }

  @Patch("read-all")
  @ApiOperation({
    summary:
      "Mark all notifications as read",
  })
  markAllAsRead(
    @CurrentUser()
    user: JwtPayload,
  ) {
    return this.notificationService
      .markAllAsRead(
        user.sub,
      );
  }
}