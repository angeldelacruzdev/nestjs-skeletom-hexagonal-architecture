import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto, FindUserRepositoryPort } from '../../application';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';
import { UserEntity } from '../../domain/entities';
import { UserMapper } from '../mappers/user.mapper';

export class FindUserRepositoryAdapter implements FindUserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) { }

  async findByEmail(email: string): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.findOne({
        where: { email: email },
      });

      if (response.id) {
        return UserMapper.toDto(response);
      }
      return null;

    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    try {
      const response = await this.userRepository.find();
      return await Promise.all(response.map(UserMapper.toDto));
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  async findUserByid(id: number): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.findOne({
        where: { id: +id },
      });
      return UserMapper.toDto(response);
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
