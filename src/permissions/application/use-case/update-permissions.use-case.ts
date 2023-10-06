import { PermissionsReponseDto, UpdatePermissionsDto } from '../dto';
import { UpdatePermissionsRepositoryPort } from '../ports';

export class UpdatePermissionsUseCase {
  constructor(
    private readonly updatePermissionsRepositoryPort: UpdatePermissionsRepositoryPort,
  ) {}

  async update(
    id: number,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsReponseDto | null> {
    return await this.updatePermissionsRepositoryPort.update(id, dto);
  }
}
