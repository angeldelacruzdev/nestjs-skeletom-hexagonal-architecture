import { UpdateUserDto, UserResponseDto } from '../dtos';

export interface UpdateUserRepository {
  update(id: number, dto: UpdateUserDto): Promise<boolean>;
  updateStatus(id: number): Promise<boolean>;
}
