import {
  CreatePermissionDto,
  PermissionsReponseDto,
  UpdatePermissionsDto,
} from '../../application';
import { Permission } from '../../domain/permission.entity';

export class PermissionMapper {
  public static toDto(entity: Permission): PermissionsReponseDto {
    const dto = new PermissionsReponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.created_at = entity.created_at;
    dto.updated_At = entity.updated_at;
    return dto;
  }

  public static toEntity(dto: CreatePermissionDto) {
    const entity = new Permission();
    entity.name = dto.name;
    entity.created_at = new Date();
    return entity;
  }

  public static toEntityResponse(dto: PermissionsReponseDto) {
    const entity = new Permission();
    entity.name = dto.name;
    entity.created_at = new Date();
    return entity;
  }

  public static toEntityRole(id: number) {
    const entity = new Permission();
    entity.id = id;
    return entity;
  }

  public static toUpdate(id: number, dto: UpdatePermissionsDto) {
    const entity = new Permission();
    entity.id = id;
    entity.name = dto.name;
    return entity;
  }
}
