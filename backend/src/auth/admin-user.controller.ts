import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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

import { AuthService } from "./auth.services";

import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

import { JwtAuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/roles.guard";

import { CurrentUser } from "./decorators/user.decorators";
import { Roles } from "./decorators/roles.decorators";

import type { JwtPayload } from "./strategies/strategies";

@ApiTags("Admin Users")
@ApiBearerAuth()
@Controller("admin/users")
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(UserRole.ADMIN)
export class AdminUserController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      "Get all users",
    description:
      "Returns all registered users. Password hashes are never exposed. Admin only.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Users returned successfully.",
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
  getUsers() {
    return this.authService.getAdminUsers();
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Get user details",
    description:
      "Returns administrative details for a specific user, including their cars and bookings.",
  })
  @ApiParam({
    name: "id",
    description:
      "User UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "User details returned successfully.",
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
      "User not found.",
  })
  getUser(
    @Param("id") id: string,
  ) {
    return this.authService.getAdminUser(
      id,
    );
  }

  @Patch(":id/role")
  @ApiOperation({
    summary:
      "Update a user's role",
    description:
      "Changes the role of a user. An admin cannot change their own role.",
  })
  @ApiParam({
    name: "id",
    description:
      "User UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "User role updated successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can update user roles.",
  })
  @ApiResponse({
    status: 404,
    description:
      "User not found.",
  })
  @ApiResponse({
    status: 409,
    description:
      "Admin attempted to change their own role.",
  })
  updateRole(
    @Param("id") id: string,
    @Body() dto: UpdateUserRoleDto,
    @CurrentUser() user: JwtPayload,
  ) {
    if (dto.role === undefined) {
      throw new BadRequestException("Role is required.");
    }

    return this.authService.updateUserRole(
      id,
      dto.role,
      user.sub,
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary:
      "Delete a user",
    description:
      "Deletes a user account. An admin cannot delete their own account.",
  })
  @ApiParam({
    name: "id",
    description:
      "User UUID",
  })
  @ApiResponse({
    status: 200,
    description:
      "User deleted successfully.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Authentication required.",
  })
  @ApiResponse({
    status: 403,
    description:
      "Only admins can delete users.",
  })
  @ApiResponse({
    status: 404,
    description:
      "User not found.",
  })
  @ApiResponse({
    status: 409,
    description:
      "Admin attempted to delete their own account.",
  })
  deleteUser(
    @Param("id") id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.authService.deleteUser(
      id,
      user.sub,
    );
  }
}