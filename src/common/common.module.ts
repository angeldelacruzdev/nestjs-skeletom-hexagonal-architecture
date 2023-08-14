import { Module } from '@nestjs/common';

import {
  NestjsExceptionHandlerAdapter,
  EXCEPTION_HANDLER_PORT,
} from './exceptions';

@Module({
  providers: [
    {
      provide: EXCEPTION_HANDLER_PORT,
      useClass: NestjsExceptionHandlerAdapter,
    },
  ],
})
export class CommonModule { }
