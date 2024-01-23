export class ForbiddenException extends Error {
  constructor(message: string) {
    super(message);
    this.message = 'Acceso prohibido.';
  }
}
