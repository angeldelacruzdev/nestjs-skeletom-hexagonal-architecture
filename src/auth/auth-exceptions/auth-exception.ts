export class AuthNotFoundException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message ? `Has olvidado el correo o la contraseña.` : message);
    this.name = 'AuthNotFoundException';
    this.statusCode = 404;
  }
}
