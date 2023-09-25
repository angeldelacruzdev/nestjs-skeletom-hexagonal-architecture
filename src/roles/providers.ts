import { Provider } from '@nestjs/common';
import { CREATE_ROLE_REPOSITORY } from './tokens';
import { CreateRolesRepositoryAdapter } from './infrastructure/adapters';
import { CreateRolesUseCase } from './application/use-case';
import { CreateRolesRepositoryPort } from './application';

export const provideres: Provider[] = [
  {
    provide: CREATE_ROLE_REPOSITORY,
    useClass: CreateRolesRepositoryAdapter,
  },
  {
    provide: CreateRolesUseCase,
    useFactory: (createRolesRepositoryPort: CreateRolesRepositoryPort) =>
      new CreateRolesUseCase(createRolesRepositoryPort),
    inject: [CREATE_ROLE_REPOSITORY],
  },
];
