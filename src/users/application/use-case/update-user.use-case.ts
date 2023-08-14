import { UpdateUserDto, UserResponseDto } from '../dtos';
import { UpdateUserRepository } from '../ports';

export class UpdateUserUseCase {
  constructor(private readonly updateUserRepository: UpdateUserRepository) { }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    return await this.updateUserRepository.update(id, dto);
  }
}
