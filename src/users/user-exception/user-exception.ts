export class UserBadRequestException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (+code == 23505) {
      this.message = 'Ya existe la información que esta suministrando';
      this.statusCode = 400;
    } else {
      this.name = 'UserBadRequestException';
      this.statusCode = 404;
    }
  }
}

export class UserInternalErrorException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (code) {
      this.message = message;
      this.statusCode = code;
    } else {
      this.message = 'Ha ocurrido un interno en el servidor.';
      this.name = 'InternalErrorException';
      this.statusCode = 500;
    }
  }
}
