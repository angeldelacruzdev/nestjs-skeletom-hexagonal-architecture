import { Logger } from '@nestjs/common';
import { LoggerPort } from './logger-port';
import * as winston from 'winston';
export class LoggerAdapter implements LoggerPort {
  private readonly logger = new Logger();

  log(message: string, context?: string): void {
    this.logger.log(message, context);

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });

    // También puedes imprimir los logs en la consola para desarrollo
    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }
}
