import { QueryFailedError } from 'typeorm';
import { ExceptionHandlerPort } from './exception-handler.port';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NestjsExceptionHandlerAdapter implements ExceptionHandlerPort {
  handle(exception: any): HttpException {
    const exceptions = exception;
    if (exception instanceof QueryFailedError) {
      // Lógica para manejar la excepción personalizada
      if (exceptions.code === '23505') {
        throw new HttpException(
          'Ya existe la información que está intentado guardar.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (exceptions.code === '10776') {
        throw new HttpException(
          'Error de sintaxis en la base de datos.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (exceptions.code === '42703') {
        throw new HttpException(
          'No existe una relación en las tablas.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (exceptions.code === '23502') {
        throw new HttpException(
          'Lo datos no pueden contener datos nulos.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (exception instanceof Error) {
      throw new HttpException(exception.message, 401);
    }

    throw new HttpException(
      'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
