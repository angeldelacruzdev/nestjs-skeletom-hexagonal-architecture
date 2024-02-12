import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
import { UserBadRequestException } from '../../user-exception';

export class CreateUserRepositoryAdapter implements CreateUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      if (!response) {
        throw new UserBadRequestException();
      }

      return UserMapper.toDto(response);
    } catch (error) {
      this.logger.log(error);
      if (error instanceof UserBadRequestException) {
        throw new UserBadRequestException();
      }
    }
  }
}
