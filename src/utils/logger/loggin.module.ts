import { Module } from '@nestjs/common';
import { LoggerAdapter } from './logger.adapter';
import { TOKEN_LOGGER_PORT } from './token-logger';

@Module({
  providers: [
    {
      provide: TOKEN_LOGGER_PORT,
      useClass: LoggerAdapter,
    },
  ],
  exports: [TOKEN_LOGGER_PORT],
})
export class LoggingModule {}
