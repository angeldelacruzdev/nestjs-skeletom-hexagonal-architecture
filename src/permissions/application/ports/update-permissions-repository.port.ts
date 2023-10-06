import { PermissionsReponseDto, UpdatePermissionsDto } from '../dto';

export interface UpdatePermissionsRepositoryPort {
  update(
    id: number,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsReponseDto | null>;
}
