import { Provider } from '@nestjs/common';
import {
  EXCEPTION_HANDLER_PORT,
  NestjsExceptionHandlerAdapter,
} from '../common';
import { LoggerAdapter, TOKEN_LOGGER_PORT } from '../utils';
import { CREATE_PERMISSION_REPOSITORY } from './tokens';
import { CreatePermissionsRepositoryAdapter } from './infrastructure';
import {
  CreatePermissionUseCase,
  CreatePermissionsRepositoryPort,
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
    provide: CreatePermissionUseCase,
    useFactory: (
      createPermissionsRepositoryPort: CreatePermissionsRepositoryPort,
    ) => new CreatePermissionUseCase(createPermissionsRepositoryPort),
    inject: [CREATE_PERMISSION_REPOSITORY],
  },
];
