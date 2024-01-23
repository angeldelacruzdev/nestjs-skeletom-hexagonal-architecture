import { HttpException } from './http-exception';

export class ForbiddenException extends HttpException {
  constructor() {
    super('ForbiddenException', 'Forbidden');
  }
}
