import {
  IsEnum,
} from "class-validator";

import {
  ApiProperty,
} from "@nestjs/swagger";

import {
  UserRole,
} from "../../../generated/prisma/client";

export class UpdateUserRoleDto {
  @ApiProperty({
    description:
      "New role to assign to the user",
    enum: UserRole,
    example: UserRole.OWNER,
  })
  @IsEnum(UserRole)
  role?: UserRole;
}