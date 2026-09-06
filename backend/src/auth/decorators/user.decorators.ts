import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

import { JwtPayload } from "../strategies/strategies";

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    context: ExecutionContext,
  ): JwtPayload => {
    const request = context
      .switchToHttp()
      .getRequest();

    return request.user;
  },
);