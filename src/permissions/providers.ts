import { Provider } from '@nestjs/common';

import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';

import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';

import {
  CREATE_PERMISSION_REPOSITORY,
  FIND_PERMISSION_REPOSITORY,
  UPDATE_PERMISSION_REPOSITORY,
} from './tokens';

import {
  CreatePermissionsRepositoryAdapter,
  FindPermissionsRepositoryAdapter,
  UpdatePermissionsRepositoryAdapter,
} from './infrastructure';

import {
  CreatePermissionUseCase,
  CreatePermissionsRepositoryPort,
  FindPermissionsRepositoryPort,
  FindPermissionsUseCase,
  UpdatePermissionsRepositoryPort,
  UpdatePermissionsUseCase,
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
    provide: UPDATE_PERMISSION_REPOSITORY,
    useClass: UpdatePermissionsRepositoryAdapter,
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
  {
    provide: UpdatePermissionsUseCase,
    useFactory: (
      updatePermissionsRepositoryPort: UpdatePermissionsRepositoryPort,
    ) => new UpdatePermissionsUseCase(updatePermissionsRepositoryPort),
    inject: [UPDATE_PERMISSION_REPOSITORY],
  },
];
