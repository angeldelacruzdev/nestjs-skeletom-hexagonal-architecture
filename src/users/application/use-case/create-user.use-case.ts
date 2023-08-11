import { CreateUserDto, UserResponseDto } from '../dtos';
import { CreateUserRepositoryPort } from '../ports';

export class CreateUserUseCase {
  constructor(private readonly createRepository: CreateUserRepositoryPort) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const response = await this.createRepository.create(dto);
    return response;
  }
}
