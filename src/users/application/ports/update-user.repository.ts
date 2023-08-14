import { UpdateUserDto, UserResponseDto } from '../dtos';

export interface UpdateUserRepository {
  update(id: number, dto: UpdateUserDto): Promise<UserResponseDto>;
  updateStatus(id: number, status: boolean): Promise<UserResponseDto>;
}
