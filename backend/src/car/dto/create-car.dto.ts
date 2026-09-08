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

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make?: string;

  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsEnum(CarType)
  type?: CarType;

  @IsEnum(Transmission)
  transmission?: Transmission;

  @IsEnum(FuelType)
  fuel?: FuelType;

  @IsInt()
  @Min(1)
  @Max(20)
  seats?: number;

  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsNumber()
  @Min(0.01)
  pricePerDay?: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true })
  @ApiPropertyOptional({
    type: [String],
    description: "Public image URLs for the car (max 6).",
    example: ["https://images.example.com/cars/honda-city.jpg"],
  })
  images?: string[];
}