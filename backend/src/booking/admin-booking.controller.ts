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
  UserRole,
} from "../../generated/prisma/client";

import { BookingService } from "./booking.service";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorators";

@ApiTags("Admin Bookings")
@ApiBearerAuth()
@Controller("admin/bookings")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.ADMIN)
export class AdminBookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get all bookings",
    description:
      "Returns all bookings across the entire platform. Admin only.",
  })
  @ApiResponse({
    status: 200,
    description:
      "All bookings returned successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can access this endpoint.",
  })
  getBookings() {
    return this.bookingService
      .getAdminBookings();
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Get any booking",
    description:
      "Returns complete details for any booking. Admin only.",
  })
  @ApiParam({
    name: "id",
    description:
      "Booking UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Booking details returned successfully.",
  })
  @ApiResponse({
    status: 404,
    description:
      "Booking not found.",
  })
  getBooking(
    @Param("id") id: string,
  ) {
    return this.bookingService
      .getAdminBooking(id);
  }

  @Patch(":id/cancel")
  @ApiOperation({
    summary:
      "Cancel a booking",
    description:
      "Cancels a confirmed booking. Completed and already cancelled bookings cannot be cancelled.",
  })
  @ApiParam({
    name: "id",
    description:
      "Booking UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Booking cancelled successfully.",
  })
  @ApiResponse({
    status: 404,
    description:
      "Booking not found.",
  })
  @ApiResponse({
    status: 409,
    description:
      "Booking cannot be cancelled.",
  })
  cancelBooking(
    @Param("id") id: string,
  ) {
    return this.bookingService
      .cancelBookingByAdmin(id);
  }
}