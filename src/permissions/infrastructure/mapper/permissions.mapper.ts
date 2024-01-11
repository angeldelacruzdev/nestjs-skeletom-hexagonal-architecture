import {
  CreatePermissionDto,
  PermissionsResponseDto,
  UpdatePermissionsDto,
} from '../../application';
import { Permission } from '../../domain/permission.entity';

export class PermissionMapper {
  public static toDto(entity: Permission): PermissionsResponseDto {
    const dto = new PermissionsResponseDto();
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

  public static toEntityResponse(dto: PermissionsResponseDto) {
    const entity = new Permission();
    entity.name = dto.name;
    entity.created_at = new Date();
    return entity;
  }

  public static toEntityRole(id: string) {
    const entity = new Permission();
    entity.id = id;
    return entity;
  }

  public static toUpdate(id: string, dto: UpdatePermissionsDto) {
    const entity = new Permission();
    entity.id = id;
    entity.name = dto.name;
    return entity;
  }
}
