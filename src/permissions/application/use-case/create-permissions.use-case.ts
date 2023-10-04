import { CreatePermissionDto, PermissionsReponseDto } from '../dto';
import { CreatePermissionsRepositoryPort } from '../ports';

export class CreatePermissionUseCase {
  constructor(
    private readonly createPermissionsRepositoryPort: CreatePermissionsRepositoryPort,
  ) {}

  async create(
    dto: CreatePermissionDto,
  ): Promise<PermissionsReponseDto | null> {
    return await this.createPermissionsRepositoryPort.create(dto);
  }
}
