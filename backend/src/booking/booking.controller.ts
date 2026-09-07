import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import type { CreateBookingDto } from "./dto/create-booking.dto";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

import { Roles } from "../auth/decorators/roles.decorators";
import { CurrentUser } from "../auth/decorators/user.decorators";

import type { JwtPayload } from "../auth/strategies/strategies";

@ApiTags("Bookings")
@ApiBearerAuth()
@Controller("bookings")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.RENTER)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      "Create a car rental booking",
  })
  @ApiResponse({
    status: 201,
    description:
      "Booking created successfully.",
    example: {
      message:
        "Booking created successfully",
      payment: {
        status: "SUCCESS",
        transactionId:
          "MOCK-123e4567-e89b-12d3-a456-426614174000",
      },
      booking: {
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
        },
        bookingAddOns: [
          {
            id: "550e8400-e29b-41d4-a716-446655440002",
            addOn: {
              id: "550e8400-e29b-41d4-a716-446655440003",
              name: "GPS",
              pricePerDay: "300.00",
            },
            pricePerDaySnapshot:
              "300.00",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      "Invalid request body or UUID/date format.",
    example: {
      statusCode: 400,
      message: [
        "carId must be a UUID",
        "pickupAt must be a valid ISO 8601 date string",
      ],
      path: "/api/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication is required.",
    example: {
      statusCode: 401,
      message: "Unauthorized",
      path: "/api/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 403,
    description:
      "The renter attempted to book their own car.",
    example: {
      statusCode: 403,
      message:
        "You cannot book your own car",
      path: "/api/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 409,
    description:
      "The car is unavailable, unapproved, rental duration is invalid, add-on is invalid, or another booking conflict occurred.",
    example: {
      statusCode: 409,
      message:
        "Car is no longer available for the selected dates",
      path: "/api/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  createBooking(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingService
      .createBooking(
        user.sub,
        dto,
      );
  }

  @Get()
  @ApiOperation({
    summary:
      "Get the current renter's bookings",
  })
  @ApiResponse({
    status: 200,
    description:
      "All bookings belonging to the authenticated renter.",
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
        },
        bookingAddOns: [
          {
            id: "550e8400-e29b-41d4-a716-446655440002",
            addOn: {
              id: "550e8400-e29b-41d4-a716-446655440003",
              name: "GPS",
              pricePerDay: "300.00",
            },
          },
        ],
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
      path: "/api/bookings",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  getUserBookings(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .getUserBookings(
        user.sub,
      );
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Get a booking by ID",
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
      "Booking returned when the authenticated user is the renter or owner of the car.",
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
      },
      renter: {
        id: "550e8400-e29b-41d4-a716-446655440005",
        name: "Shrey Varma",
        email:
          "renter@example.com",
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
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 403,
    description:
      "The authenticated user does not own or rent this booking.",
    example: {
      statusCode: 403,
      message:
        "You do not have access to this booking",
      path:
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 404,
    description:
      "Booking not found.",
    example: {
      statusCode: 404,
      message: "Booking not found",
      path:
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  getBooking(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .getBooking(
        id,
        user.sub,
      );
  }

  @Patch(":id/cancel")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      "Cancel a confirmed booking",
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
      "Booking cancelled successfully.",
    example: {
      message:
        "Booking cancelled successfully",
      booking: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: "CANCELLED",
      },
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
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000/cancel",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 403,
    description:
      "Only the renter who created the booking can cancel it.",
    example: {
      statusCode: 403,
      message:
        "You can only cancel your own bookings",
      path:
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000/cancel",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  @ApiResponse({
    status: 409,
    description:
      "Booking cannot be cancelled because it is not confirmed or the cancellation window has expired.",
    example: {
      statusCode: 409,
      message:
        "Booking can only be cancelled at least 24 hours before pickup",
      path:
        "/api/bookings/550e8400-e29b-41d4-a716-446655440000/cancel",
      timestamp:
        "2030-01-01T10:00:00.000Z",
    },
  })
  cancelBooking(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bookingService
      .cancelBooking(
        id,
        user.sub,
      );
  }
}