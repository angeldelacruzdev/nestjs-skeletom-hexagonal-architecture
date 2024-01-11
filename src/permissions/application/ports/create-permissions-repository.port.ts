import { CreatePermissionDto, PermissionsResponseDto } from '../dto';

export interface CreatePermissionsRepositoryPort {
  create(dto: CreatePermissionDto): Promise<PermissionsResponseDto | null>;
}
