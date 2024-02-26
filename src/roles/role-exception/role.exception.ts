export class RoleBadRequestException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (+code == 23505) {
      throw new RoleDuplicateRegistrationException();
    } else {
      this.message = 'Excepción de solicitud incorrecta de rol.';
      this.name = 'RoleBadRequestException';
      this.statusCode = 400;
    }
  }
}

export class RoleDuplicateRegistrationException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (code) {
      this.message = message;
      this.statusCode = code;
    } else {
      this.message =
        'Señala una violación de la restricción de clave primaria, indicando un duplicado.';
      this.name = 'RoleDuplicateRegistrationException';
      this.statusCode = 500;
    }
  }
}

export class RoleInternalErrorException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (code) {
      this.message = message;
      this.statusCode = code;
    } else {
      this.message = 'Ha ocurrido un interno en el servidor.';
      this.name = 'RoleInternalErrorException';
      this.statusCode = 500;
    }
  }
}
