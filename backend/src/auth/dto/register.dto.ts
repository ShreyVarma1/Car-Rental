import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\+91[\-\s]?)?[6-9]\d{9}$/, {
    message:
      "phone must be a valid Indian mobile number (e.g. 9876543210 or +919876543210)",
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  drivingLicense?: string;
}