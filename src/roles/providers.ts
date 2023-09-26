import { Provider } from '@nestjs/common';

import { CREATE_ROLE_REPOSITORY, FIND_ROLE_REPOSITORY } from './tokens';

import {
  CreateRolesRepositoryAdapter,
  FindRolesRepositoryAdapter,
} from './infrastructure/adapters';

import { CreateRolesUseCase, FindRolesUseCase } from './application/use-case';

import {
  CreateRolesRepositoryPort,
  FindRolesRepositoryPort,
} from './application';

import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
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
    provide: FIND_ROLE_REPOSITORY,
    useClass: FindRolesRepositoryAdapter,
  },
  {
    provide: CreateRolesUseCase,
    useFactory: (
      createRolesRepositoryPort: CreateRolesRepositoryPort,
      exceptionHandlerPort: ExceptionHandlerPort,
    ) =>
      new CreateRolesUseCase(createRolesRepositoryPort, exceptionHandlerPort),
    inject: [CREATE_ROLE_REPOSITORY, EXCEPTION_HANDLER_PORT, TOKEN_LOGGER_PORT],
  },
  {
    provide: FindRolesUseCase,
    useFactory: (
      findRolesRepositoryPort: FindRolesRepositoryPort,
      exceptionHandlerPort: ExceptionHandlerPort,
    ) => new FindRolesUseCase(findRolesRepositoryPort, exceptionHandlerPort),
    inject: [FIND_ROLE_REPOSITORY, EXCEPTION_HANDLER_PORT, TOKEN_LOGGER_PORT],
  },
];
