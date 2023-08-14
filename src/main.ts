import { NestFactory } from '@nestjs/core';


import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: 400, // Código de estado para errores de validación
    }),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });


  await app.listen(process.env.PORT || 3001);
}
bootstrap();
