import { CreatePermissionDto, PermissionsReponseDto } from '../dto';

export interface CreatePermissionsRepositoryPort {
  create(dto: CreatePermissionDto): Promise<PermissionsReponseDto | null>;
}
