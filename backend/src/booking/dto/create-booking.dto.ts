import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsOptional,
  IsUUID,
} from "class-validator";

import {
  ApiProperty,
  ApiPropertyOptional,
} from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty({
    description:
      "UUID of the car being booked",
    example:
      "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsUUID()
  carId?: string;

  @ApiProperty({
    description:
      "Pickup date and time in ISO 8601 format",
    example:
      "2030-01-10T10:00:00.000Z",
  })
  @IsDateString()
  pickupAt?: string;

  @ApiProperty({
    description:
      "Drop-off date and time in ISO 8601 format",
    example:
      "2030-01-13T10:00:00.000Z",
  })
  @IsDateString()
  dropOffAt?: string;

  @ApiPropertyOptional({
    description:
      "UUIDs of selected active add-ons",
    example: [
      "550e8400-e29b-41d4-a716-446655440001",
    ],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUUID("4", {
    each: true,
  })
  addOnIds?: string[];
}