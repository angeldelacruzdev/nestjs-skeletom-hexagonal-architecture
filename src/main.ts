import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader(
      'Access-Control-Allow-Origin',
      `http://localhost:${process.env.PORT}`,
    );
    next();
  });

  await app.listen(process.env.PORT || 3001, () => {
    logger.log(
      `La aplicación está corriendo en http://localhost:${process.env.PORT}`,
    );
  });
}
bootstrap();
