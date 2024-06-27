import { CreateRolesDto, RolesResponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';
import { PermissionMapper, PermissionsResponseDto } from '../../../permissions';

export class RolesMapper {
  public static toEntity(dto: CreateRolesDto): Role {
    const entity = new Role();
    entity.name = dto.name;
    entity.permissions = [];
    entity.created_at = new Date();
    return entity;
  }

  public static toDto(entity: Role): RolesResponseDto {
    const dto = new RolesResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.permissions = entity.permissions.map(PermissionMapper.toDto);
    dto.created_at = entity.created_at;
    return dto;
  }

  public static assignPermissionsEntity(
    id: string,
    permissionIds: PermissionsResponseDto[],
  ): Role {
    const entity = new Role();
    entity.id = id;
    entity.permissions = permissionIds.map((dto) => {
      return PermissionMapper.toEntityResponse(dto);
    });
    return entity;
  }
}
