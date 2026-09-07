import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from "class-validator";

import {
  ApiProperty,
  ApiPropertyOptional,
} from "@nestjs/swagger";

export class CreateReviewDto {
  @ApiProperty({
    description:
      "UUID of the completed booking being reviewed",
    example:
      "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsUUID()
  bookingId?: string;

  @ApiProperty({
    description:
      "Rating from 1 to 5",
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description:
      "Optional review comment",
    example:
      "Excellent car and very smooth experience.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}