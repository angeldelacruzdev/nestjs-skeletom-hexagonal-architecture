import { Provider } from '@nestjs/common';

import {
  AT_STRATEGIEST,
  AuthUseCase,
  RT_STRATEGIEST,
  RegisterRepositoryPort,
  LogOutUseCase,
  LogOutPort,
  AuthTokenGenerateUseCase,
  AuthTokenGeneratePort,
} from './application';

import { AtStrategiest, RtStrategiest } from '../jwt/strategies';

import {
  CREATE_REPOSITORY_PORT,
  FIND_REPOSITORY_PORT,
  FindUserRepositoryPort,
  FindUserUseCase,
} from './../users/application';

import {
  CreateUserRepositoryAdapter,
  FindUserRepositoryAdapter,
} from './../users/infrastructure';

import { RegisterUseCase } from './application/use-case/register.use-case';
import {
  LOG_OUT_USER_REPOSITORY,
  REGISTER_USER_REPOSITORY,
  TOKEN_GENERATE_REPOSITORY,
} from './application/token/auth-repository-token';
import { RegisterRepositoryAdapter } from './infrastructure/adapters/register-repository.adapter';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
  NestjsExceptionHandlerAdapter,
} from '../common';
import { LoggerAdapter, LoggerPort, TOKEN_LOGGER_PORT } from '../utils';
import { LogOutRepositoryAdapter } from './infrastructure/adapters/log-out.repository.adapter';
import { AuthTokenGenerateRepositoryAdapter } from './infrastructure/adapters';

export const providers: Provider[] = [
  {
    provide: EXCEPTION_HANDLER_PORT,
    useClass: NestjsExceptionHandlerAdapter,
  },
  {
    provide: TOKEN_LOGGER_PORT,
    useClass: LoggerAdapter,
  },
  {
    provide: AT_STRATEGIEST,
    useClass: RtStrategiest,
  },
  {
    provide: RT_STRATEGIEST,
    useClass: AtStrategiest,
  },
  {
    provide: LOG_OUT_USER_REPOSITORY,
    useClass: LogOutRepositoryAdapter,
  },
  {
    provide: FIND_REPOSITORY_PORT,
    useClass: FindUserRepositoryAdapter,
  },
  {
    provide: CREATE_REPOSITORY_PORT,
    useClass: CreateUserRepositoryAdapter,
  },
  {
    provide: REGISTER_USER_REPOSITORY,
    useClass: RegisterRepositoryAdapter,
  },
  {
    provide: TOKEN_GENERATE_REPOSITORY,
    useClass: AuthTokenGenerateRepositoryAdapter,
  },
  {
    provide: AuthUseCase,
    useFactory: (
      findUserRepositoryPort: FindUserRepositoryPort,
      exceptionHandlerPort: ExceptionHandlerPort,
      loggerPort: LoggerPort,
      authTokenGeneratePort: AuthTokenGeneratePort,
    ) => {
      const findUserUseCase = new FindUserUseCase(findUserRepositoryPort);
      return new AuthUseCase(
        findUserUseCase,
        exceptionHandlerPort,
        loggerPort,
        authTokenGeneratePort,
      );
    },
    inject: [
      FIND_REPOSITORY_PORT,
      EXCEPTION_HANDLER_PORT,
      TOKEN_LOGGER_PORT,
      TOKEN_GENERATE_REPOSITORY,
    ],
  },
  {
    provide: RegisterUseCase,
    useFactory: (registerRepositoryPort: RegisterRepositoryPort) => {
      return new RegisterUseCase(registerRepositoryPort);
    },
    inject: [REGISTER_USER_REPOSITORY, EXCEPTION_HANDLER_PORT],
  },
  {
    provide: LogOutUseCase,
    useFactory: (logOutPort: LogOutPort) => {
      return new LogOutUseCase(logOutPort);
    },
    inject: [LOG_OUT_USER_REPOSITORY, EXCEPTION_HANDLER_PORT],
  },
  {
    provide: AuthTokenGenerateUseCase,
    useFactory: (
      authTokenGeneratePort: AuthTokenGeneratePort,
      findUserRepositoryPort: FindUserRepositoryPort,
    ) => {
      const findUserUseCase = new FindUserUseCase(findUserRepositoryPort);

      return new AuthTokenGenerateUseCase(
        authTokenGeneratePort,
        findUserUseCase,
      );
    },
    inject: [
      TOKEN_GENERATE_REPOSITORY,
      FIND_REPOSITORY_PORT,
      EXCEPTION_HANDLER_PORT,
    ],
  },
];
