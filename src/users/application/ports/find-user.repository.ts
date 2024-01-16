import { UserResponseDto } from '../dtos';
export interface FindUserRepositoryPort {
  findAll(): Promise<UserResponseDto[]>;
  findUserByid(id: string): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<UserResponseDto>;
  findUserRtHash(id: string, token: string): Promise<string>;
  findRtHashByUserId(id: string): Promise<string>;
}
