import { LoggerService } from '@nestjs/common';
import { LoggerRepositoryPort } from './logger-repository.port';

export class LoggerAdapter implements LoggerRepositoryPort {
  constructor(private readonly logger: LoggerService) {}

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  // Puedes agregar más métodos aquí según tus necesidades
}
