import { User } from './../../../users/domain/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../../application';
import { UserDetails } from './../../../users/domain/entities/user-details.entity';

export class UserMapper {
  public static async toEntity(dto: CreateUserDto): Promise<User> {
    const entity = new User();
    entity.password = dto.password;
    entity.email = dto.email;
    entity.rt_hash = 'asds55511';
    entity.status = dto.status;
    entity.details = this.toEntityDetail(dto.details);
    return entity;
  }



  public static toEntityDetail(dto: any): UserDetails {
    const entity = new UserDetails();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    return entity;
  }



  public static async toDto(entity: User): Promise<UserResponseDto> {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.status = entity.status;
    return dto;
  }

  public static async toUpdateEntity(dto: UpdateUserDto): Promise<User> {
    const entity = new User();
    entity.email = dto.email;
    entity.rt_hash = 'asds55511';
    entity.status = dto.status;
    return entity;
  }
}
