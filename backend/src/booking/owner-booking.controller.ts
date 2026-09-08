import {
  Controller,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { UserRole } from "../../generated/prisma/client";

import { BookingService } from "./booking.service";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

import { Roles } from "../auth/decorators/roles.decorators";
import { CurrentUser } from "../auth/decorators/user.decorators";

import type { JwtPayload } from "../auth/strategies/strategies";

@ApiTags("Owner Bookings")
@ApiBearerAuth()
@Controller("owner/bookings")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.OWNER)
export class OwnerBookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get bookings for the owner's cars",
    description:
      "Returns all bookings belonging to cars owned by the authenticated owner.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Owner bookings returned successfully.",
    example: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        referenceNumber:
          "CR-1893456000000-A1B2C3D4E5",
        pickupAt:
          "2030-01-10T10:00:00.000Z",
        dropOffAt:
          "2030-01-13T10:00:00.000Z",
        days: 3,
        carPricePerDay: "2500.00",
        addOnsTotal: "900.00",
        subtotal: "8400.00",
        tax: "1512.00",
        totalAmount: "9912.00",
        status: "CONFIRMED",

        car: {
          id: "550e8400-e29b-41d4-a716-446655440001",
          make: "Toyota",
          model: "Fortuner",
          city: "Delhi",
          pricePerDay: "2500.00",
        },

        renter: {
          id: "550e8400-e29b-41d4-a716-446655440005",
          name: "Rahul Sharma",
          email: "rahul@example.com",
          phone: "9876543210",
        },

        bookingAddOns: [],
      },
    ],
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication is required.",
    example: {
      statusCode: 401,
      message: "Unauthorized",
      path: "/api/owner/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 403,
    description:
      "Only users with the OWNER role can access this endpoint.",
    example: {
      statusCode: 403,
      message: "Forbidden resource",
      path: "/api/owner/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  getOwnerBookings(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .getOwnerBookings(user.sub);
  }

  @Get("dashboard")
  @ApiOperation({
    summary:
      "Get the owner's revenue and utilisation dashboard",
    description:
      "Returns total revenue, per-car revenue, per-car average rating and per-car-per-month booking utilisation for cars owned by the authenticated owner.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Owner dashboard returned successfully.",
    example: {
      totalRevenue: 24600,
      totalBookings: 4,
      revenueByCar: [
        {
          carId:
            "550e8400-e29b-41d4-a716-446655440001",
          make: "Toyota",
          model: "Fortuner",
          totalRevenue: 19824,
          bookingCount: 2,
          averageRating: 4.5,
          reviewCount: 2,
        },
      ],
      monthlyUtilization: [
        {
          carId:
            "550e8400-e29b-41d4-a716-446655440001",
          make: "Toyota",
          model: "Fortuner",
          month: "2030-01",
          bookingCount: 2,
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication is required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only users with the OWNER role can access this endpoint.",
  })
  getOwnerDashboard(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .getOwnerDashboard(user.sub);
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Get an owner's booking by ID",
    description:
      "Returns a booking only when the authenticated owner owns the car associated with that booking.",
  })
  @ApiParam({
    name: "id",
    description:
      "Booking UUID",
    example:
      "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiResponse({
    status: 200,
    description:
      "Booking returned successfully.",
    example: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      referenceNumber:
        "CR-1893456000000-A1B2C3D4E5",

      pickupAt:
        "2030-01-10T10:00:00.000Z",

      dropOffAt:
        "2030-01-13T10:00:00.000Z",

      days: 3,

      carPricePerDay: "2500.00",
      addOnsTotal: "900.00",
      subtotal: "8400.00",
      tax: "1512.00",
      totalAmount: "9912.00",

      status: "CONFIRMED",

      car: {
        id: "550e8400-e29b-41d4-a716-446655440001",
        ownerId:
          "550e8400-e29b-41d4-a716-446655440004",
        make: "Toyota",
        model: "Fortuner",
        city: "Delhi",
        pricePerDay: "2500.00",
      },

      renter: {
        id: "550e8400-e29b-41d4-a716-446655440005",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
      },

      bookingAddOns: [],

      review: null,
    },
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication is required.",
    example: {
      statusCode: 401,
      message: "Unauthorized",
      path:
        "/api/owner/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 403,
    description:
      "Only users with the OWNER role can access this endpoint.",
    example: {
      statusCode: 403,
      message: "Forbidden resource",
      path:
        "/api/owner/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 404,
    description:
      "Booking does not exist or does not belong to one of the owner's cars.",
    example: {
      statusCode: 404,
      message: "Booking not found",
      path:
        "/api/owner/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  getOwnerBooking(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .getOwnerBooking(
        id,
        user.sub,
      );
  }
}