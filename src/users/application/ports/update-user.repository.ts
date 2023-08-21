import { UpdateUserDto, UserResponseDto } from '../dtos';

export interface UpdateUserRepository {
  update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
  updateStatus(id: string, status: boolean): Promise<UserResponseDto>;
}
