import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

import { AddOnService } from "./addon.services";

import { CreateAddOnDto } from "./dto/create-addon.dto";
import { UpdateAddOnDto } from "./dto/update-addon.dto";

import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorators";

@ApiTags("Add-ons")
@Controller("addons")
export class AddOnController {
  constructor(
    private readonly addOnService: AddOnService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get active add-ons",
  })
  @ApiResponse({
    status: 200,
    description:
      "Active add-ons returned",
  })
  getAddOns() {
    return this.addOnService.getAddOns();
  }

  @Get("admin")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Get all add-ons including inactive ones",
  })
  getAllForAdmin() {
    return this.addOnService.getAddOns(
      true,
    );
  }

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Create an add-on",
  })
  @ApiResponse({
    status: 201,
    description:
      "Add-on created",
  })
  @ApiResponse({
    status: 409,
    description:
      "Add-on name already exists",
  })
  createAddOn(
    @Body() dto: CreateAddOnDto,
  ) {
    return this.addOnService.createAddOn(
      dto,
    );
  }

  @Patch(":id")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Update or activate/deactivate an add-on",
  })
  updateAddOn(
    @Param("id") id: string,
    @Body() dto: UpdateAddOnDto,
  ) {
    return this.addOnService.updateAddOn(
      id,
      dto,
    );
  }

  @Delete(":id")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Delete an unused add-on",
  })
  deleteAddOn(
    @Param("id") id: string,
  ) {
    return this.addOnService.deleteAddOn(
      id,
    );
  }
}