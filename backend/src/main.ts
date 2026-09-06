import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Prefix all API endpoints with /api
  app.setGlobalPrefix("api");

  // Validate all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Handle all application errors consistently
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  // Allow requests from the frontend
  app.enableCors({
    origin: configService.get<string>("FRONTEND_URL"),
    credentials: true,
  });

  // Swagger / OpenAPI configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Car Rental Booking API")
    .setDescription(
      "REST API for the Car Rental Booking System",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  // Generate OpenAPI document
  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  // Mount Swagger UI
  SwaggerModule.setup("docs", app, document, {
    useGlobalPrefix: true,
  });

  // Start server
  const port = configService.get<number>("PORT", 4000);

  await app.listen(port);
}

bootstrap();