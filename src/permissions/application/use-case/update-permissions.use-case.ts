import { UpdatePermissionsRepositoryPort } from '../ports';

export class UpdatePermissionsUseCase {
  constructor(
    private readonly updatePermissionsRepositoryPort: UpdatePermissionsRepositoryPort,
  ) {}
}
