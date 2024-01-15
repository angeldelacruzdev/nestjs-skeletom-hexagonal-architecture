import { UserResponseDto } from '../dtos';
import { FindUserRepositoryPort } from '../ports';

export class FindUserUseCase {
  constructor(private readonly userRepository: FindUserRepositoryPort) {}

  async findUserByid(id: string): Promise<UserResponseDto> {
    return await this.userRepository.findUserByid(id);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    return await this.userRepository.findByEmail(email);
  }

  async findUserRtHash(id: string, token: string): Promise<string> {
    return this.userRepository.findUserRtHash(id, token);
  }
}
