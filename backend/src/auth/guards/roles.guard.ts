import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { UserRole } from "../../../generated/prisma/client";

import {
  ROLES_KEY,
} from "../decorators/roles.decorators";

import { JwtPayload } from "../strategies/strategies";

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (!requiredRoles?.length) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user =
      request.user as JwtPayload;

    if (!user) {
      throw new ForbiddenException(
        "User information is unavailable",
      );
    }

    const hasRequiredRole =
      requiredRoles.includes(user.role);

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        "You do not have permission to access this resource",
      );
    }

    return true;
  }
}