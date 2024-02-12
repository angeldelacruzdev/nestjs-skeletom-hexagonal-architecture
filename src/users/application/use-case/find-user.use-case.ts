import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { UserResponseDto } from '../dtos';
import { FindUserRepositoryPort } from '../ports';

export class FindUserUseCase {
  constructor(private readonly userRepository: FindUserRepositoryPort) {}

  async findUserByid(id: string): Promise<UserResponseDto> {
    return await this.userRepository.findUserByid(id);
  }

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<UserResponseDto> | null> {
    return await this.userRepository.findMany(pagination);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    return await this.userRepository.findByEmail(email);
  }

  async findUserRtHash(id: string, token: string): Promise<string> {
    return this.userRepository.findUserRtHash(id, token);
  }

  async findRtHashByUserId(id: string): Promise<string> {
    return await this.userRepository.findRtHashByUserId(id);
  }
}
