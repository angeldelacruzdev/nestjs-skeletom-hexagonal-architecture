import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class AuthNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'Has olvidado el correo o la contraseña.');
  }
}

export class AuthBadRequestException extends BadRequestException {
  constructor(message?: string, code?: number) {
    if (code) {
      super(message);
    } else {
      super('Solicitud incorrecta.');
    }
  }
}

export class InternalErrorException extends InternalServerErrorException {
  constructor(message?: string, code?: number) {
    if (code) {
      super(message);
    } else {
      super('Ha ocurrido un error interno en el servidor.');
    }
  }
}
