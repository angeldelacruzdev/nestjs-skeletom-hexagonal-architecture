import { Provider } from '@nestjs/common';
import { CREATE_ROLE_REPOSITORY } from './tokens';
import { CreateRolesRepositoryAdapter } from './infrastructure/adapters';

export const provideres: Provider[] = [
  {
    provide: CREATE_ROLE_REPOSITORY,
    useClass: CreateRolesRepositoryAdapter,
  },
//   {
//     provide: FindUserUseCase,
//     useFactory: (findUserRepositoryPort: FindUserRepositoryPort) =>
//       new FindUserUseCase(findUserRepositoryPort),
//     inject: [FIND_REPOSITORY_PORT],
//   },
];
