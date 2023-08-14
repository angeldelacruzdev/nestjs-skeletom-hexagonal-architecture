import { UserResponseDto } from '../dtos';

export interface FindUserRepositoryPort {
  findAll(): Promise<UserResponseDto[]>;
  findUserByid(id: string): Promise<UserResponseDto>;
}
