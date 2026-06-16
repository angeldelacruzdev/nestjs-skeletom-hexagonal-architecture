import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class RoleBadRequestException extends BadRequestException {
  constructor(message?: string, code?: number) {
    if (+code === 23505) {
      throw new RoleDuplicateRegistrationException();
    }
    super(message ?? 'Excepción de solicitud incorrecta de rol.');
  }
}

export class RoleDuplicateRegistrationException extends ConflictException {
  constructor(message?: string, code?: number) {
    if (code) {
      super(message);
    } else {
      super(
        'Señala una violación de la restricción de clave primaria, indicando un duplicado.',
      );
    }
  }
}

export class RoleInternalErrorException extends InternalServerErrorException {
  constructor(message?: string, code?: number) {
    if (code) {
      super(message);
    } else {
      super('Ha ocurrido un error interno en el servidor.');
    }
  }
}
