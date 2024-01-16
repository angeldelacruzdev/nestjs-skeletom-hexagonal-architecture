import {
  AuthRegisterDto,
  RegisterRepositoryPort,
  RegisterResponseDto,
} from './../../../auth/application';
import { CreateUserRepositoryAdapter } from './../../../users/infrastructure';
import { Inject } from '@nestjs/common';
import { AuthMapper } from '../mappers/auth.mapper';
import { CREATE_REPOSITORY_PORT } from '../../../users/application';

export class RegisterRepositoryAdapter implements RegisterRepositoryPort {
  constructor(
    @Inject(CREATE_REPOSITORY_PORT)
    private readonly userRepository: CreateUserRepositoryAdapter,
  ) {}

  async register(dto: AuthRegisterDto): Promise<RegisterResponseDto> {
    const response = await this.userRepository.create(dto);
    return AuthMapper.toDto(response);
  }
}
