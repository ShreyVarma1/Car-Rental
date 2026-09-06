import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  HttpCode,
  HttpStatus,
} from "@nestjs/common";

import type { Request, Response } from "express";

import { UserRole } from "../../generated/prisma/client";

import { AuthService } from "./auth.services";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import { JwtAuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/roles.guard";

import { CurrentUser } from "./decorators/user.decorators";
import { Roles } from "./decorators/roles.decorators";

import type { JwtPayload } from "./strategies/strategies";

import {
  getRefreshTokenCookieOptions,
  REFRESH_TOKEN_COOKIE,
} from "./utils/refresh-cookie.utils";

interface RequestWithCookies
  extends Request {
  cookies: {
    refresh_token?: string;
  };
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
  })
  @ApiResponse({
    status: 201,
    description:
      "User registered successfully",
  })
  @ApiResponse({
    status: 400,
    description:
      "Invalid registration data",
  })
  @ApiResponse({
    status: 409,
    description:
      "Email is already registered",
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      "Login and create access and refresh tokens",
  })
  @ApiResponse({
    status: 200,
    description:
      "Login successful. Refresh token is stored in an HttpOnly cookie.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Invalid email or password",
  })
  async login(
    @Body() dto: LoginDto,

    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const result =
      await this.authService.login(dto);

    const {
      refreshToken,
      ...responseData
    } = result;

    this.setRefreshTokenCookie(
      response,
      refreshToken,
    );

    return responseData;
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth(
    REFRESH_TOKEN_COOKIE,
  )
  @ApiOperation({
    summary:
      "Refresh the access token",
  })
  @ApiResponse({
    status: 201,
    description:
      "Access token refreshed successfully",
  })
  @ApiResponse({
    status: 401,
    description:
      "Refresh token is missing, invalid, expired, or revoked",
  })
  async refresh(
    @Req()
    request: RequestWithCookies,

    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const refreshToken =
      request.cookies?.[
        REFRESH_TOKEN_COOKIE
      ];

    if (!refreshToken) {
      throw new UnauthorizedException(
        "Refresh token is missing",
      );
    }

    const result =
      await this.authService.refresh(
        refreshToken,
      );

    this.setRefreshTokenCookie(
      response,
      result.refreshToken,
    );

    const {
      refreshToken: _refreshToken,
      ...responseData
    } = result;

    return responseData;
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth(
    REFRESH_TOKEN_COOKIE,
  )
  @ApiOperation({
    summary:
      "Logout the current refresh session",
  })
  @ApiResponse({
    status: 201,
    description:
      "Logout successful",
  })
  async logout(
    @Req()
    request: RequestWithCookies,

    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const refreshToken =
      request.cookies?.[
        REFRESH_TOKEN_COOKIE
      ];

    if (refreshToken) {
      await this.authService.logout(
        refreshToken,
      );
    }

    this.clearRefreshTokenCookie(
      response,
    );

    return {
      message: "Logout successful",
    };
  }

  @Post("logout-all")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Logout all refresh sessions for the current user",
  })
  @ApiResponse({
    status: 201,
    description:
      "All sessions logged out successfully",
  })
  @ApiResponse({
    status: 401,
    description:
      "JWT is missing, invalid, or expired",
  })
  async logoutAll(
    @CurrentUser() user: JwtPayload,

    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const result =
      await this.authService.logoutAll(
        user.sub,
      );

    this.clearRefreshTokenCookie(
      response,
    );

    return result;
  }

  @Get("protected")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Test JWT protected endpoint",
  })
  @ApiResponse({
    status: 200,
    description:
      "JWT is valid",
  })
  @ApiResponse({
    status: 401,
    description:
      "JWT is missing, invalid, or expired",
  })
  protectedRoute() {
    return {
      message:
        "You successfully accessed a protected route",
    };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Get the currently authenticated user",
  })
  @ApiResponse({
    status: 200,
    description:
      "Current user returned successfully",
  })
  @ApiResponse({
    status: 401,
    description:
      "JWT is missing, invalid, or expired",
  })
  getCurrentUser(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.authService.getCurrentUser(
      user.sub,
    );
  }

  @Get("admin-test")
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "Test admin-only authorization",
  })
  @ApiResponse({
    status: 200,
    description:
      "User has admin permission",
  })
  @ApiResponse({
    status: 401,
    description:
      "JWT is missing, invalid, or expired",
  })
  @ApiResponse({
    status: 403,
    description:
      "User is authenticated but not an admin",
  })
  adminTest() {
    return {
      message:
        "You successfully accessed the admin-only route",
    };
  }

  private setRefreshTokenCookie(
    response: Response,
    refreshToken: string,
  ) {
    const expiresInDays =
      this.configService.get<number>(
        "REFRESH_TOKEN_EXPIRES_DAYS",
        7,
      );

    response.cookie(
      REFRESH_TOKEN_COOKIE,
      refreshToken,
      getRefreshTokenCookieOptions(
        expiresInDays,
      ),
    );
  }

  private clearRefreshTokenCookie(
    response: Response,
  ) {
    response.clearCookie(
      REFRESH_TOKEN_COOKIE,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        path: "/api/auth",
      },
    );
  }
}
