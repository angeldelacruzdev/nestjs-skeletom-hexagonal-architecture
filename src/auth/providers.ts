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
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';
import { LogOutRepositoryAdapter } from './infrastructure/adapters/log-out.repository.adapter';
import { AuthTokenGenerateRepositoryAdapter } from './infrastructure/adapters';

export const providers: Provider[] = [
  {
    provide: TOKEN_LOGGER_PORT,
    useClass: LoggerAdapter,
  },
  {
    provide: AT_STRATEGIEST,
    useClass: AtStrategiest,
  },
  {
    provide: RT_STRATEGIEST,
    useClass: RtStrategiest,
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
      findUserUseCase: FindUserUseCase,
      authTokenGeneratePort: AuthTokenGeneratePort,
    ) => new AuthUseCase(findUserUseCase, authTokenGeneratePort),
    inject: [FindUserUseCase, TOKEN_GENERATE_REPOSITORY],
  },
  {
    provide: RegisterUseCase,
    useFactory: (registerRepositoryPort: RegisterRepositoryPort) => {
      return new RegisterUseCase(registerRepositoryPort);
    },
    inject: [REGISTER_USER_REPOSITORY],
  },
  {
    provide: LogOutUseCase,
    useFactory: (logOutPort: LogOutPort) => {
      return new LogOutUseCase(logOutPort);
    },
    inject: [LOG_OUT_USER_REPOSITORY],
  },
  {
    provide: AuthTokenGenerateUseCase,
    useFactory: (
      authTokenGeneratePort: AuthTokenGeneratePort,
      findUserUseCase: FindUserUseCase,
    ) => new AuthTokenGenerateUseCase(authTokenGeneratePort, findUserUseCase),
    inject: [TOKEN_GENERATE_REPOSITORY, FindUserUseCase],
  },
];
