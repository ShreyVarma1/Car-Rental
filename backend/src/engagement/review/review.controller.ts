import {
  Body,
  Controller,
  Get,
  Param,
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

import {
  UserRole,
} from "../../../generated/prisma/client";

import {
  ReviewService,
} from "./review.service";

import {
  CreateReviewDto,
} from "./dto/create-review.dto";

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

@ApiTags("Reviews")
@ApiBearerAuth()
@Controller("reviews")
export class ReviewController {
  constructor(
    private readonly reviewService:
      ReviewService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.RENTER)
  @ApiOperation({
    summary:
      "Create a review",
  })
  @ApiResponse({
    status: 201,
    description:
      "Review created successfully",
  })
  async createReview(
    @CurrentUser()
    user: JwtPayload,

    @Body()
    dto: CreateReviewDto,
  ) {
    return this.reviewService
      .createReview(
        user.sub,
        dto,
      );
  }

  @Get("car/:carId")
  @ApiOperation({
    summary:
      "Get reviews for a car",
  })
  @ApiParam({
    name: "carId",
    description:
      "Car UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "Car reviews",
  })
  async getCarReviews(
    @Param("carId")
    carId: string,
  ) {
    return this.reviewService
      .getCarReviews(
        carId,
      );
  }
}