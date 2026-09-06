import { CookieOptions } from "express";

export const REFRESH_TOKEN_COOKIE =
  "refresh_token";

export function getRefreshTokenCookieOptions(
  expiresInDays: number,
): CookieOptions {
  return {
    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite:
      process.env.NODE_ENV ===
      "production"
        ? "none"
        : "lax",

    maxAge:
      expiresInDays *
      24 *
      60 *
      60 *
      1000,

    path: "/api/auth",
  };
}