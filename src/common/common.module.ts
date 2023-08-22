import { Module } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import {
  NestjsExceptionHandlerAdapter,
  EXCEPTION_HANDLER_PORT,
} from './exceptions';

import { LoggerAdapter } from './logger/logger.adapter';
import { LOGGER_TOKEN } from './logger/logger.token';

@Module({
  providers: [
    {
      provide: EXCEPTION_HANDLER_PORT,
      useClass: NestjsExceptionHandlerAdapter,
    },
    {
      provide: LOGGER_TOKEN,
      useClass: LoggerAdapter,
    },
  ],
  exports: [
    {
      provide: EXCEPTION_HANDLER_PORT,
      useClass: NestjsExceptionHandlerAdapter,
    },
    {
      provide: LOGGER_TOKEN,
      useClass: LoggerAdapter,
    },
  ],
})
export class CommonModule { }
