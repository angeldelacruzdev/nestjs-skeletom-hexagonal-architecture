import { PermissionMapper } from '../../../permissions';
import { CreateRolesDto, RolesReponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';

export class RolesMapper {
  public static toEntity(dto: CreateRolesDto): Role {
    const entity = new Role();
    entity.name = dto.name;
    entity.permissions = [];
    entity.created_at = new Date();
    return entity;
  }

  public static toDto(entity: Role): RolesReponseDto {
    const dto = new RolesReponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.permissions = entity.permissions.map(PermissionMapper.toDto);
    dto.created_at = entity.created_at;
    return dto;
  }
}
