import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(
    req: FastifyRequest['originalUrl'],
    res: FastifyReply['raw'],
    next: () => void,
  ) {
    console.log(req['originalUrl']);
    console.log('Request...');
    next();
  }
}
