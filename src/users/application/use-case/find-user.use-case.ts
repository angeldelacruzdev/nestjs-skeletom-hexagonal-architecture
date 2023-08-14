import { UserResponseDto } from '../dtos';
import { FindUserRepositoryPort } from '../ports';

export class FindUserUseCase {
  constructor(private readonly userRepository: FindUserRepositoryPort) { }

  async findUserByid(id: number): Promise<UserResponseDto> {
    return await this.userRepository.findUserByid(id);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.userRepository.findAll();
  }
}
