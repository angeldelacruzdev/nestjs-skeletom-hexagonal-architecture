export class UserBadRequestException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(
      message ? `No se pudo completar la creación de la información.` : message,
    );
    this.name = 'UserBadRequestException';
    this.statusCode = 404;
  }
}
