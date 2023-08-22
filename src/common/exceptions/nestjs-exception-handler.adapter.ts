import { QueryFailedError } from 'typeorm';
import { ExceptionHandlerPort } from './exception-handler.port';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NestjsExceptionHandlerAdapter implements ExceptionHandlerPort {
  handle(exception: any): HttpException {
    if (exception instanceof QueryFailedError) {
      // Lógica para manejar la excepción personalizada
      throw new HttpException('El email ya está en uso.', 401);
    }
    if (exception.code === '23505') {
      throw new HttpException('El email ya está en uso.', 401);
    }

    if (exception.code === '42703') {
      throw new HttpException('No existe una relación en las tablas.', 401);
    }

    // Manejo genérico para otras excepciones
    throw new HttpException(
      'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
