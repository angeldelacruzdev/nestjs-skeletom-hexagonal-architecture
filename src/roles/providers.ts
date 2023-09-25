import { Provider } from '@nestjs/common';
import { CREATE_ROLE_REPOSITORY } from './tokens';
import { CreateRolesRepositoryAdapter } from './infrastructure/adapters';
import { CreateRolesUseCase } from './application/use-case';
import { CreateRolesRepositoryPort } from './application';
import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';

export const provideres: Provider[] = [
  {
    provide: EXCEPTION_HANDLER_PORT,
    useClass: NestjsExceptionHandlerAdapter,
  },
  {
    provide: TOKEN_LOGGER_PORT,
    useClass: LoggerAdapter,
  },
  {
    provide: CREATE_ROLE_REPOSITORY,
    useClass: CreateRolesRepositoryAdapter,
  },
  {
    provide: CreateRolesUseCase,
    useFactory: (createRolesRepositoryPort: CreateRolesRepositoryPort) =>
      new CreateRolesUseCase(createRolesRepositoryPort),
    inject: [CREATE_ROLE_REPOSITORY, EXCEPTION_HANDLER_PORT, TOKEN_LOGGER_PORT],
  },
];
