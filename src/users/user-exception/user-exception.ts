import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserBadRequestException extends BadRequestException {
  constructor(message?: string, code?: number) {
    if (+code === 23505) {
      super('Ya existe la información que esta suministrando');
    } else {
      super(message ?? 'Solicitud incorrecta.');
    }
  }
}

export class UserInternalErrorException extends InternalServerErrorException {
  constructor(message?: string, code?: number) {
    if (code) {
      super(message);
    } else {
      super('Ha ocurrido un error interno en el servidor.');
    }
  }
}
