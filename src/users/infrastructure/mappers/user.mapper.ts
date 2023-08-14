import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../../application';
import { UserEntity } from '../../domain/entities';

export class UserMapper {
  public static async toEntity(dto: CreateUserDto): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.username = dto.user_name;
    entity.password = dto.password;
    entity.email = dto.email;
    entity.rt_hash = 'asds55511';
    entity.is_admin = dto.is_admin;
    entity.status = dto.status;
    return entity;
  }

  public static async toDto(entity: UserEntity): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.user_name = entity.username;
    dto.email = entity.email;
    dto.is_admin = entity.is_admin;
    dto.status = entity.status;
    return dto;
  }

  public static async toUpdateEntity(dto: UpdateUserDto): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.username = dto.user_name;
    entity.password = dto.password;
    entity.email = dto.email;
    entity.rt_hash = 'asds55511';
    entity.is_admin = dto.is_admin;
    entity.status = dto.status;
    return entity;
  }
}
