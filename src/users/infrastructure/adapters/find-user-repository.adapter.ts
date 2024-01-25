import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserResponseDto, FindUserRepositoryPort } from '../../application';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';

import { UserMapper } from '../mappers/user.mapper';
import { User } from './../../../users/domain/entities/user.entity';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

export class FindUserRepositoryAdapter implements FindUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async findRtHashByUserId(id: string): Promise<string> {
    try {
      const response = await this.userRepository
        .createQueryBuilder()
        .select('password')
        .where('id = :id', { id })
        .getRawOne();

      if (!response) {
        throw new Error("No tiene permisos para ejecutar est'a acción.");
      }
      return response.password;
      // return response;
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }

  async findUserRtHash(id: string, token: string): Promise<string> {
    try {
      const response = await this.userRepository
        .createQueryBuilder()
        .select('rt_hash')
        .where('id = :id', { id })
        .getRawOne();

      const isMatch = await bcrypt.compare(token, response.rt_hash);

      if (!isMatch) {
        throw new Error("No tiene permisos para ejecutar est'a acción.");
      }
      return response.rt_hash;
      // return response;
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.findOne({
        where: { email: email },
      });

      if (response) {
        return UserMapper.toDto(response);
      }

      return null;
    } catch (error) {
      console.log('error: ', error.message);
      this.logger.error(error.message);
      return this.exceptionHandler.handle(error.message);
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const response = await this.userRepository.find();
      return await Promise.all(response.map(UserMapper.toDto));
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }

  async findUserByid(id: string): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.findOne({
        where: { id: id },
      });
      return UserMapper.toDto(response);
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }
}
