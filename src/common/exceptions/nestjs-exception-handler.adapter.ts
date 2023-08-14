import { ExceptionHandlerPort } from './exception-handler.port';
import { SomeCustomException } from './some-custom-exception';

import { HttpException, HttpStatus } from '@nestjs/common';

export class NestjsExceptionHandlerAdapter implements ExceptionHandlerPort {
  handle(exception: any): any {
    if (exception instanceof SomeCustomException) {
      // Lógica para manejar la excepción personalizada
      return new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }

    if (exception.code === '23505') {
      return new HttpException('El email ya está en uso.', 401);
    }

    console.log(exception.code);

    // Manejo genérico para otras excepciones
    return new HttpException(
      'Error interno del servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
