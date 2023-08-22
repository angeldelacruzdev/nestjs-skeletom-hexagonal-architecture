import { LoggerRepositoryPort } from './../../../common/logger/logger-repository.port';
import { LOGGER_TOKEN } from './../../../common/logger/logger.token';

import { Repository } from 'typeorm';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';

import {
  CreateUserDto,
  UserResponseDto,
  CreateUserRepositoryPort,
} from '../../application';

import { UserMapper } from '../mappers/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';

import { User } from './../../../users/domain/entities/user.entity';

export class CreateUserRepositoryAdapter implements CreateUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const entity = await UserMapper.toEntity(dto);
      const response = await this.userRepository.save(entity);
      return UserMapper.toDto(response);
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
