import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

import { CarService } from "./car.services";

import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { SearchCarsDto } from "./dto/search-car.dto";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

import { CurrentUser } from "../auth/decorators/user.decorators";
import { Roles } from "../auth/decorators/roles.decorators";

import type { JwtPayload } from "../auth/strategies/strategies";

@ApiTags("Cars")
@Controller("cars")
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) {}

  /*
   * PUBLIC
   *
   * Search approved cars.
   *
   * This endpoint does not require
   * authentication.
   */
  @Get()
  @ApiOperation({
    summary:
      "Search approved cars",
  })
  @ApiResponse({
    status: 200,
    description:
      "Paginated list of available cars",
  })
  @ApiResponse({
    status: 409,
    description:
      "Invalid date range",
  })
  search(
    @Query() dto: SearchCarsDto,
  ) {
    return this.carService.searchCars(
      dto,
    );
  }

  /*
   * OWNER ONLY
   *
   * Get all cars belonging to the
   * authenticated owner.
   *
   * IMPORTANT:
   * This route must be declared before
   * @Get(":id"), otherwise "owner" could
   * be interpreted as a car ID.
   */
  @Get("owner")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Get my car listings",
    description:
      "Returns all car listings belonging to the authenticated owner.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Owner's cars returned successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only owners can access their car listings.",
  })
  getOwnerCars(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.carService.getOwnerCars(
      user.sub,
    );
  }

  /*
   * PUBLIC
   *
   * Get car details by ID.
   */
  @Get(":id")
  @ApiOperation({
    summary:
      "Get car details",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car details returned",
  })
  @ApiResponse({
    status: 404,
    description:
      "Car not found",
  })
  getCar(
    @Param("id") id: string,
  ) {
    return this.carService.getCar(id);
  }

  /*
   * OWNER ONLY
   *
   * Create a new car listing.
   */
  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Create a car listing",
  })
  @ApiResponse({
    status: 201,
    description:
      "Car created and awaiting approval",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only owners can create cars",
  })
  createCar(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateCarDto,
  ) {
    return this.carService.createCar(
      user.sub,
      dto,
    );
  }

  /*
   * OWNER ONLY
   *
   * Update the owner's own car.
   *
   * The service checks ownership and
   * changes the status back to PENDING.
   */
  @Patch(":id")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Update own car listing",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car updated and returned to pending approval",
  })
  @ApiResponse({
    status: 403,
    description:
      "Car belongs to another owner",
  })
  updateCar(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateCarDto,
  ) {
    return this.carService.updateCar(
      id,
      user.sub,
      dto,
    );
  }

  /*
   * OWNER ONLY
   *
   * Delete the owner's own car.
   *
   * The service prevents deletion when
   * upcoming confirmed bookings exist.
   */
  @Delete(":id")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Delete own car listing",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car deleted successfully",
  })
  @ApiResponse({
    status: 403,
    description:
      "Car belongs to another owner",
  })
  @ApiResponse({
    status: 409,
    description:
      "Car has upcoming bookings",
  })
  deleteCar(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.carService.deleteCar(
      id,
      user.sub,
    );
  }
}