import { Provider } from '@nestjs/common';

import {
  ASSIGN_ROLE_PERMISSION_REPOSITORY,
  CREATE_ROLE_REPOSITORY,
  FIND_ROLE_REPOSITORY,
} from './tokens';

import {
  AssignPermissionsToRoleRepositoryAdapter,
  CreateRolesRepositoryAdapter,
  FindRolesRepositoryAdapter,
} from './infrastructure';

import {
  AssignPermissionsToRoleRepositoryPort,
  CreateRolesUseCase,
  FindRolesUseCase,
} from './application';

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
import { AssignPermissionsToRoleUseCase } from './application/use-case/assign-permissions-to-role-use-case';

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
    provide: ASSIGN_ROLE_PERMISSION_REPOSITORY,
    useClass: AssignPermissionsToRoleRepositoryAdapter,
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

  {
    provide: AssignPermissionsToRoleUseCase,
    useFactory: (
      assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
      exceptionHandlerPort: ExceptionHandlerPort,
    ) =>
      new AssignPermissionsToRoleUseCase(
        assignPermissionsToRoleRepositoryPort,
        exceptionHandlerPort,
      ),
    inject: [ASSIGN_ROLE_PERMISSION_REPOSITORY, EXCEPTION_HANDLER_PORT],
  },
];
