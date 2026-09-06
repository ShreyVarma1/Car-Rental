import {
  Controller,
  Get,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { HealthService } from "./health.services";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Check API and database health",
  })
  @ApiResponse({
    status: 200,
    description: "API and database are healthy",
  })
  @ApiResponse({
    status: 500,
    description: "Database or server is unavailable",
  })
  check() {
    return this.healthService.check();
  }
}