import { CreateUserDto, UserResponseDto } from '../dtos';

export interface CreateUserRepositoryPort {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
}
