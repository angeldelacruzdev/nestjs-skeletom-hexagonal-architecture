import { UserResponseDto } from '../dtos';

export interface FindUserRepositoryPort {
  findAll(): Promise<UserResponseDto[]>;
  findUserByid(id: number): Promise<UserResponseDto>;
}
