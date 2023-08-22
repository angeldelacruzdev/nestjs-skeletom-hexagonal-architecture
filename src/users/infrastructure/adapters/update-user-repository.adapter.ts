import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  FIND_REPOSITORY_PORT,
  UpdateUserDto,
  UpdateUserRepository,
  UserResponseDto,
} from './../../application';
import { User } from '../../domain/entities/user.entity';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';
import { UserMapper } from '../mappers';
import { FindUserRepositoryAdapter } from './find-user-repository.adapter';
export class UpdateUserRepositoryAdapter implements UpdateUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(FIND_REPOSITORY_PORT)
    private readonly findUserRepositoryAdapter: FindUserRepositoryAdapter,
  ) {}

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      const entity = await UserMapper.toUpdateEntity(dto);
      const response = await this.userRepository.update(id, entity);
      if (response) {
        return await this.findUserRepositoryAdapter.findUserByid(id);
      }
      return null;
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  async updateStatus(id: string, status: boolean): Promise<UserResponseDto> {
    try {
      const response = await this.userRepository.update(id, { status });
      if (response) {
        return await this.findUserRepositoryAdapter.findUserByid(id);
      }
      return null;
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
