import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';

import {
  CreateUserDto,
  UserResponseDto,
  CreateUserRepositoryPort,
} from '../../application';

import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';

import { UserMapper } from '../mappers';
import { User } from '../../domain/entities/user.entity';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

export class CreateUserRepositoryAdapter implements CreateUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const saltOrRounds = 10;
      const rtTokenHash = dto.password;

      const hash = await bcrypt.hash(rtTokenHash, saltOrRounds);
      dto.password = hash;

      const entity = await UserMapper.toEntity(dto);
      const response = await this.userRepository.save(entity);

      return UserMapper.toDto(response);
    } catch (error) {
      this.logger.log(error);
      return this.exceptionHandler.handle(error);
    }
  }
}
