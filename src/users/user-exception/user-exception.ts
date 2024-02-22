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
