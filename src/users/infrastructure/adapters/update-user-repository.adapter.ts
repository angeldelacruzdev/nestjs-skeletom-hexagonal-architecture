import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto, UpdateUserRepository } from './../../application';
import { UserEntity } from '../../domain';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers';
export class UpdateUserRepositoryAdapter implements UpdateUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) {}

  // TODO: terminar de verificar si el usuario esta activo o no.
  updateStatus(id: number): Promise<boolean> {
    return;
  }

  async update(id: number, dto: UpdateUserDto): Promise<boolean> {
    try {
      const entity = await UserMapper.toUpdateEntity(dto);
      const response = await this.userRepository.update(id, entity);

      if (response) {
        return true;
      }
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
