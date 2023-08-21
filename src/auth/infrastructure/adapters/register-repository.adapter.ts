import {
  RegisterDto,
  RegisterReponseDto,
  RegisterRepositoryPort,
} from './../../../auth/application';
import { CreateUserRepositoryAdapter } from './../../../users/infrastructure';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthMapper } from '../mappers/auth.mapper';
import { CREATE_REPOSITORY_PORT } from './../../../users/application/token/user-repository.token';
export class RegisterRepositoryAdapter implements RegisterRepositoryPort {
  constructor(
    @Inject(forwardRef(() => CREATE_REPOSITORY_PORT))
    private readonly userRepository: CreateUserRepositoryAdapter,
  ) { }

  async register(dto: RegisterDto): Promise<RegisterReponseDto> {
    const response = await this.userRepository.create(dto);
    return AuthMapper.toDto(response);
  }
}
