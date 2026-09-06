import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

import { ValidationPipe } from "@nestjs/common";

import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  const configService =
    app.get(ConfigService);

  app.setGlobalPrefix("api");

  app.use(cookieParser());

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

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.enableCors({
    origin:
      configService.get<string>(
        "FRONTEND_URL",
      ),

    credentials: true,
  });

  const swaggerConfig =
    new DocumentBuilder()
      .setTitle(
        "Car Rental Booking API",
      )
      .setDescription(
        "REST API for the Car Rental Booking System",
      )
      .setVersion("1.0")

      .addBearerAuth()

      .addCookieAuth(
        "refresh_token",
      )

      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      swaggerConfig,
    );

  SwaggerModule.setup(
    "docs",
    app,
    document,
    {
      useGlobalPrefix: true,
    },
  );

  const port =
    configService.get<number>(
      "PORT",
      4000,
    );

  await app.listen(port);
}

bootstrap();