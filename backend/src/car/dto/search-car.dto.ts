import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

import {
  CarType,
  FuelType,
  Transmission,
} from "../../../generated/prisma/client";

export class SearchCarsDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsDateString()
  pickupAt?: string;

  @IsOptional()
  @IsDateString()
  dropOffAt?: string;

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
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsEnum([
    "pricePerDay",
    "createdAt",
    "year",
    "make",
    "model",
  ])
  sortBy?:
    | "pricePerDay"
    | "createdAt"
    | "year"
    | "make"
    | "model" = "createdAt";

  @IsOptional()
  @IsEnum(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc";
}