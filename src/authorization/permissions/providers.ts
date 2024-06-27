import { Provider } from '@nestjs/common';

import {
  CREATE_PERMISSION_REPOSITORY,
  DELETE_PERMISSION_REPOSITORY,
  FIND_PERMISSION_REPOSITORY,
  UPDATE_PERMISSION_REPOSITORY,
} from './tokens';

import {
  CreatePermissionsRepositoryAdapter,
  DeletePermissionsRepositoryAdapter,
  FindPermissionsRepositoryAdapter,
  UpdatePermissionsRepositoryAdapter,
} from './infrastructure';

import {
  CreatePermissionUseCase,
  CreatePermissionsRepositoryPort,
  DeletePermissionsRepositoryPort,
  DeletePermissionsUseCase,
  FindPermissionsRepositoryPort,
  FindPermissionsUseCase,
  UpdatePermissionsRepositoryPort,
  UpdatePermissionsUseCase,
} from './application';
import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../../common';
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../../utils';

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
    provide: DELETE_PERMISSION_REPOSITORY,
    useClass: DeletePermissionsRepositoryAdapter,
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
  {
    provide: DeletePermissionsUseCase,
    useFactory: (
      deletePermissionsRepositoryPort: DeletePermissionsRepositoryPort,
    ) => new DeletePermissionsUseCase(deletePermissionsRepositoryPort),
    inject: [DELETE_PERMISSION_REPOSITORY],
  },
];
