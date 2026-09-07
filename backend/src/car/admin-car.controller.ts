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

import { CarService } from "./car.services";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

import { Roles } from "../auth/decorators/roles.decorators";

@ApiTags("Admin Cars")
@ApiBearerAuth()
@Controller("admin/cars")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.ADMIN)
export class AdminCarController {
  constructor(
    private readonly carService: CarService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get all car listings",
    description:
      "Returns all car listings including pending, approved and rejected cars. Admin only.",
  })
  @ApiResponse({
    status: 200,
    description:
      "All car listings returned successfully.",
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
  getCars() {
    return this.carService
      .getAdminCars();
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Get any car listing",
    description:
      "Returns complete administrative details for a car, regardless of its approval status.",
  })
  @ApiParam({
    name: "id",
    description:
      "Car UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car details returned successfully.",
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
  @ApiResponse({
    status: 404,
    description:
      "Car not found.",
  })
  getCar(
    @Param("id") id: string,
  ) {
    return this.carService
      .getAdminCar(id);
  }

  @Patch(":id/approve")
  @ApiOperation({
    summary:
      "Approve a car listing",
    description:
      "Changes a pending or rejected car listing to APPROVED.",
  })
  @ApiParam({
    name: "id",
    description:
      "Car UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car approved successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can approve cars.",
  })
  @ApiResponse({
    status: 404,
    description:
      "Car not found.",
  })
  @ApiResponse({
    status: 409,
    description:
      "Car is already approved.",
  })
  approveCar(
    @Param("id") id: string,
  ) {
    return this.carService
      .approveCar(id);
  }

  @Patch(":id/reject")
  @ApiOperation({
    summary:
      "Reject a car listing",
    description:
      "Changes a pending or approved car listing to REJECTED.",
  })
  @ApiParam({
    name: "id",
    description:
      "Car UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car rejected successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can reject cars.",
  })
  @ApiResponse({
    status: 404,
    description:
      "Car not found.",
  })
  @ApiResponse({
    status: 409,
    description:
      "Car is already rejected.",
  })
  rejectCar(
    @Param("id") id: string,
  ) {
    return this.carService
      .rejectCar(id);
  }
}