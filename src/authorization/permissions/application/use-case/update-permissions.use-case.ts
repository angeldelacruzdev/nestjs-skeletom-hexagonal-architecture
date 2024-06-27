import { PermissionsResponseDto, UpdatePermissionsDto } from '../dto';
import { UpdatePermissionsRepositoryPort } from '../ports';

export class UpdatePermissionsUseCase {
  constructor(
    private readonly updatePermissionsRepositoryPort: UpdatePermissionsRepositoryPort,
  ) {}

  async update(
    id: string,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsResponseDto | null> {
    return await this.updatePermissionsRepositoryPort.update(id, dto);
  }
}
