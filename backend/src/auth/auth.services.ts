import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import {
  generateRefreshToken,
  hashRefreshToken,
} from "./utils/tokens.utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser =
      await this.authRepository.findUserByEmail(
        dto.email,
      );

    if (existingUser) {
      throw new ConflictException(
        "Email is already registered",
      );
    }

    const passwordHash =
      await bcrypt.hash(dto.password, 12);

    const user =
      await this.authRepository.createUser({
        name: dto.name,
        email: dto.email,
        passwordHash,
        phone: dto.phone,
        drivingLicense: dto.drivingLicense,
      });

    return {
      message: "User registered successfully",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        drivingLicense:
          user.drivingLicense,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user =
      await this.authRepository.findUserByEmail(
        dto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        "Invalid email or password",
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        dto.password,
        user.passwordHash,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        "Invalid email or password",
      );
    }

    const accessToken =
      await this.createAccessToken(user);

    const refreshToken =
      await this.createRefreshSession(
        user.id,
      );

    return {
      message: "Login successful",

      accessToken,

      refreshToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        drivingLicense:
          user.drivingLicense,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    const tokenHash =
      hashRefreshToken(refreshToken);

    const session =
      await this.authRepository.findRefreshSession(
        tokenHash,
      );

    if (!session) {
      throw new UnauthorizedException(
        "Invalid refresh token",
      );
    }

    if (session.revokedAt) {
      throw new UnauthorizedException(
        "Refresh token has been revoked",
      );
    }

    if (
      session.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new UnauthorizedException(
        "Refresh token has expired",
      );
    }

    const user =
      await this.authRepository.findUserById(
        session.userId,
      );

    if (!user) {
      throw new UnauthorizedException(
        "User no longer exists",
      );
    }

    const newRefreshToken =
      generateRefreshToken();

    const newTokenHash =
      hashRefreshToken(
        newRefreshToken,
      );

    const expiresAt =
      this.calculateRefreshExpiry();

    const rotatedSession =
      await this.authRepository.rotateRefreshSession(
        {
          sessionId: session.id,
          userId: user.id,
          tokenHash: newTokenHash,
          expiresAt,
        },
      );

    if (!rotatedSession) {
      throw new UnauthorizedException(
        "Refresh token has already been used",
      );
    }

    const accessToken =
      await this.createAccessToken(user);

    return {
      message: "Token refreshed successfully",

      accessToken,

      refreshToken:
        newRefreshToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        drivingLicense:
          user.drivingLicense,
        role: user.role,
      },
    };
  }

  async logout(refreshToken: string) {
    const tokenHash =
      hashRefreshToken(refreshToken);

    const session =
      await this.authRepository.findRefreshSession(
        tokenHash,
      );

    if (session && !session.revokedAt) {
      await this.authRepository
        .revokeRefreshSession(
          session.id,
        );
    }

    return {
      message: "Logout successful",
    };
  }

  async logoutAll(userId: string) {
    await this.authRepository
      .revokeAllRefreshSessions(
        userId,
      );

    return {
      message:
        "All sessions have been logged out",
    };
  }

  async getCurrentUser(userId: string) {
    const user =
      await this.authRepository.findUserById(
        userId,
      );

    if (!user) {
      throw new UnauthorizedException(
        "User no longer exists",
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      drivingLicense:
        user.drivingLicense,
      role: user.role,
    };
  }

  private async createAccessToken(
    user: {
      id: string;
      email: string;
      role: any;
    },
  ) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(
      payload,
    );
  }

  private async createRefreshSession(
    userId: string,
  ) {
    const refreshToken =
      generateRefreshToken();

    const tokenHash =
      hashRefreshToken(refreshToken);

    const expiresAt =
      this.calculateRefreshExpiry();

    await this.authRepository
      .createRefreshSession({
        userId,
        tokenHash,
        expiresAt,
      });

    return refreshToken;
  }

  private calculateRefreshExpiry() {
    const expiresInDays =
      this.configService.get<number>(
        "REFRESH_TOKEN_EXPIRES_DAYS",
        7,
      );

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
        expiresInDays,
    );

    return expiresAt;
  }
}