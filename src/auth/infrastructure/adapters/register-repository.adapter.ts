import {
  RegisterDto,
  RegisterReponseDto,
  RegisterRepositoryPort,
} from './../../../auth/application';
import { CreateUserRepositoryAdapter } from './../../../users/infrastructure';
import { Inject } from '@nestjs/common';
import { AuthMapper } from '../mappers/auth.mapper';
import { CREATE_REPOSITORY_PORT } from './../../../users/application/token/user-repository.token';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from './../../../common/exceptions';
export class RegisterRepositoryAdapter implements RegisterRepositoryPort {
  constructor(
    @Inject(CREATE_REPOSITORY_PORT)
    private readonly userRepository: CreateUserRepositoryAdapter,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterReponseDto> {
    try {
      const response = await this.userRepository.create(dto);
      return AuthMapper.toDto(response);
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
