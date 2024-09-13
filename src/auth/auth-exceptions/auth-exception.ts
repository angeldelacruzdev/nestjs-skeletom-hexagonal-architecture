export class AuthNotFoundException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ? `Has olvidada la contraseña.` : message);
    this.name = 'AuthNotFoundException';
    this.statusCode = 404;
  }
}

export class AuthBadRequestException extends Error {
  statusCode: number;

  constructor(message?: string, code?: number) {
    super(message);

    if (code) {
      this.message = message;
      this.statusCode = code;
    } else {
      this.name = 'UserBadRequestException';
      this.statusCode = 404;
    }
  }
}

export class InternalErrorException extends Error {
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
