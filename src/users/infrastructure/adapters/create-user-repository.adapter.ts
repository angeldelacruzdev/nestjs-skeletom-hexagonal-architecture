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

import { UserEntity } from '../../domain/entities';
import { UserMapper } from '../mappers/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';

export class CreateUserRepositoryAdapter implements CreateUserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
