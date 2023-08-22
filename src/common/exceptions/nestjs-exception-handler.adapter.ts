import { ExceptionHandlerPort } from './exception-handler.port';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NestjsExceptionHandlerAdapter implements ExceptionHandlerPort {
  handle(exception: any): HttpException {
    if (exception.code === '23505') {
      return new HttpException('El email ya está en uso.', 401);
    }

    if (exception.code === '42703') {
      return new HttpException('No existe una relación en las tablas.', 401);
    }

    // Manejo genérico para otras excepciones
    return new HttpException(
      'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
