import { Provider } from '@nestjs/common';

import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';

import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';

import {
  CREATE_PERMISSION_REPOSITORY,
  FIND_PERMISSION_REPOSITORY,
} from './tokens';

import {
  CreatePermissionsRepositoryAdapter,
  FindPermissionsRepositoryAdapter,
} from './infrastructure';

import {
  CreatePermissionUseCase,
  CreatePermissionsRepositoryPort,
  FindPermissionsRepositoryPort,
  FindPermissionsUseCase,
} from './application';

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
    provide: CREATE_PERMISSION_REPOSITORY,
    useClass: CreatePermissionsRepositoryAdapter,
  },
  {
    provide: FIND_PERMISSION_REPOSITORY,
    useClass: FindPermissionsRepositoryAdapter,
  },
  {
    provide: CreatePermissionUseCase,
    useFactory: (
      createPermissionsRepositoryPort: CreatePermissionsRepositoryPort,
    ) => new CreatePermissionUseCase(createPermissionsRepositoryPort),
    inject: [CREATE_PERMISSION_REPOSITORY],
  },

  {
    provide: FindPermissionsUseCase,
    useFactory: (
      findPermissionsRepositoryPort: FindPermissionsRepositoryPort,
    ) => new FindPermissionsUseCase(findPermissionsRepositoryPort),
    inject: [FIND_PERMISSION_REPOSITORY],
  },
];
