import { PermissionsResponseDto, UpdatePermissionsDto } from '../dto';

export interface UpdatePermissionsRepositoryPort {
  update(
    id: string,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsResponseDto | null>;
}
