import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

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
}