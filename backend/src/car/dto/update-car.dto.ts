import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

import {
  CarType,
  FuelType,
  Transmission,
} from "../../../generated/prisma/client";

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  make?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsOptional()
  @IsEnum(CarType)
  type?: CarType;

  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @IsOptional()
  @IsEnum(FuelType)
  fuel?: FuelType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  seats?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  pricePerDay?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  @ApiPropertyOptional({
    type: [String],
    description: "Public image URLs for the car (max 6). Replaces the existing set of images.",
    example: ["https://images.example.com/cars/honda-city.jpg"],
  })
  images?: string[];
}