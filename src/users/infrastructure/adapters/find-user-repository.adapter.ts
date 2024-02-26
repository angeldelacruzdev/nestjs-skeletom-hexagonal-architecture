import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserResponseDto, FindUserRepositoryPort } from '../../application';

import { UserMapper } from '../mappers/user.mapper';
import { User } from './../../../users/domain/entities/user.entity';
import {
  LoggerPort,
  PaginationDto,
  PaginationResponseDto,
  TOKEN_LOGGER_PORT,
} from '../../../utils';
import { UserBadRequestException, UserInternalErrorException } from '../../user-exception';

export class FindUserRepositoryAdapter implements FindUserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw new UserInternalErrorException();
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
        throw new UserBadRequestException("No tiene permisos para ejecutar est'a acción.");
      }
      return response.rt_hash;
      // return response;
    } catch (error) {
      this.logger.error(error);
      throw new UserInternalErrorException();
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
      throw new UserInternalErrorException();
    }
  }

  async findMany({
    limit,
    page,
    search,
    sort,
  }: PaginationDto): Promise<PaginationResponseDto<UserResponseDto>> {
    try {
      const options: FindManyOptions<User> = {
        where: {
          ...(search && { email: ILike(`%${search}%`) }),
          details: { firstName: ILike(`%${search}%`) },
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          [sort]: 'ASC',
        },
      };

      const [result, total] = await this.userRepository.findAndCount(options);
      const resultDto = result.map(UserMapper.toDto);

      const response: PaginationResponseDto<UserResponseDto> = {
        data: resultDto,
        page,
        limit,
        total,
      };

      return response;
    } catch (error) {
      this.logger.error(error);
      throw new UserInternalErrorException();
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
      throw new UserInternalErrorException();
    }
  }
}
