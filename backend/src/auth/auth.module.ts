import {
  Module,
} from "@nestjs/common";

import {
  ConfigService,
} from "@nestjs/config";

import {
  JwtModule,
} from "@nestjs/jwt";

import {
  PassportModule,
} from "@nestjs/passport";

import type {
  SignOptions,
} from "jsonwebtoken";

import {
  AdminUserController,
} from "./admin-user.controller";

import {
  AuthController,
} from "./auth.controller";

import {
  AuthService,
} from "./auth.services";

import {
  AuthRepository,
} from "./auth.repository";

import {
  JwtStrategy,
} from "./strategies/strategies";

import {
  JwtAuthGuard,
} from "./guards/auth.guard";

import {
  RolesGuard,
} from "./guards/roles.guard";

import {
  EngagementModule,
} from "../engagement/engagement.module";

@Module({
  imports: [
    PassportModule,
    EngagementModule,

    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.get<string>(
            "JWT_SECRET",
          ),

        signOptions: {
          expiresIn:
            configService.get<
              SignOptions["expiresIn"]
            >(
              "JWT_EXPIRES_IN",
              "15m",
            ),
        },
      }),
    }),
  ],

  controllers: [
    AuthController,
    AdminUserController,
  ],

  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],

  exports: [
    AuthService,
    JwtModule,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}
