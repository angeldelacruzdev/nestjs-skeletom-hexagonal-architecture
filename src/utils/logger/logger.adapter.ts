import { Logger } from '@nestjs/common';
import { LoggerPort } from './logger-port';

export class LoggerAdapter implements LoggerPort {
  private readonly logger = new Logger();

  log(message: string, context?: string): void {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }
}
