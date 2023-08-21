import { UserResponseDto } from '../dtos';

export interface UserRepositoryPort {
  findUserByid(id: string): Promise<UserResponseDto>;
  saveUser(user: any): Promise<UserResponseDto>;
}
