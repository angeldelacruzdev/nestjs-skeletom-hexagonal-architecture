import { ExceptionHandlerPort } from './../common/exceptions/exception-handler.port';
import { UpdateUserRepository } from './application/ports/update-user.repository';
import { FindUserRepositoryAdapter } from './infrastructure/adapters/find-user-repository.adapter';

import {
  FIND_REPOSITORY_PORT,
  CREATE_REPOSITORY_PORT,
  UPDATE_USER_REPOSITORY_PORT,
  DELETE_USER_REPOSITORY_PORT,
} from './application/token/user-repository.token';

import {
  CreateUserRepositoryAdapter,
  UpdateUserRepositoryAdapter,
} from './infrastructure';

import {
  CreateUserRepositoryPort,
  CreateUserUseCase,
  DeleteUserUserCase,
  FindUserRepositoryPort,
  FindUserUseCase,
  UpdateUserUseCase,
} from './application';
import { Provider } from '@nestjs/common';
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';
import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';

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
    provide: FIND_REPOSITORY_PORT,
    useClass: FindUserRepositoryAdapter,
  },
  {
    provide: CREATE_REPOSITORY_PORT,
    useClass: CreateUserRepositoryAdapter,
  },
  {
    provide: UPDATE_USER_REPOSITORY_PORT,
    useClass: UpdateUserRepositoryAdapter,
  },
  {
    provide: DELETE_USER_REPOSITORY_PORT,
    useClass: UpdateUserRepositoryAdapter,
  },
  {
    provide: FindUserUseCase,
    useFactory: (findUserRepositoryPort: FindUserRepositoryPort) =>
      new FindUserUseCase(findUserRepositoryPort),
    inject: [FIND_REPOSITORY_PORT],
  },
  {
    provide: CreateUserUseCase,
    useFactory: (createRepository: CreateUserRepositoryPort) =>
      new CreateUserUseCase(createRepository),
    inject: [CREATE_REPOSITORY_PORT, EXCEPTION_HANDLER_PORT],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (createRepository: UpdateUserRepository) =>
      new UpdateUserUseCase(createRepository),
    inject: [UPDATE_USER_REPOSITORY_PORT],
  },
  {
    provide: DeleteUserUserCase,
    useFactory: (
      createRepository: UpdateUserRepository,
      findUserRepositoryPort: FindUserRepositoryPort,
      exceptionHandlerPort: ExceptionHandlerPort,
    ) => {
      const findUserUseCase = new FindUserUseCase(findUserRepositoryPort);
      return new DeleteUserUserCase(
        createRepository,
        findUserUseCase,
        exceptionHandlerPort,
      );
    },
    inject: [
      UPDATE_USER_REPOSITORY_PORT,
      FIND_REPOSITORY_PORT,
      EXCEPTION_HANDLER_PORT,
    ],
  },
];
