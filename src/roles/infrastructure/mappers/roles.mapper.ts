import { CreateRolesDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';

export class RolesMapper {
  public static toEntity(dto: CreateRolesDto): Role {
    const entity = new Role();
    entity.name = dto.name;
    entity.created_at = new Date();
    return entity;
  }
}
