import { CreatePermissionDto, PermissionsReponseDto } from '../dto';
import { CreatePermissionsRepositoryPort } from '../ports';

export class CreatePermissionUseCase {
  constructor(
    private readonly createPermissionsRepositoryPort: CreatePermissionsRepositoryPort,
  ) {}

  create(dto: CreatePermissionDto): Promise<PermissionsReponseDto | null> {
    return;
  }
}
