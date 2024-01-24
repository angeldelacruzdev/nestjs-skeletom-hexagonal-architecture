export class AuthNotFoundException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ? `Has olvidado el correo o la contraseña.` : message);
    this.name = 'AuthNotFoundException';
    this.statusCode = 404;
  }
}

export class AuthBadRequestException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(
      message ? `No se pudo completar la creación de la información.` : message,
    );
    this.name = 'UserBadRequestException';
    this.statusCode = 404;
  }
}
