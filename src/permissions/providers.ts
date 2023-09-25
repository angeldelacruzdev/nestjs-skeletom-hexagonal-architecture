import { Provider } from '@nestjs/common';
import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';

export const providers: Provider[] = [
  {
    provide: EXCEPTION_HANDLER_PORT,
    useClass: NestjsExceptionHandlerAdapter,
  },
  {
    provide: TOKEN_LOGGER_PORT,
    useClass: LoggerAdapter,
  },
];
