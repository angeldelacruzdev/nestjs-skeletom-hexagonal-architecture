import { CreatePermissionDto, PermissionsResponseDto } from '../dto';
import { CreatePermissionsRepositoryPort } from '../ports';

export class CreatePermissionUseCase {
  constructor(
    private readonly createPermissionsRepositoryPort: CreatePermissionsRepositoryPort,
  ) {}

  async create(
    dto: CreatePermissionDto,
  ): Promise<PermissionsResponseDto | null> {
    return await this.createPermissionsRepositoryPort.create(dto);
  }
}
