import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { FindManyOptions, ILike, Repository } from 'typeorm';

import { Permission } from '../../domain/permission.entity';

import {
  FindPermissionsRepositoryPort,
  PermissionsResponseDto,
} from './../../application';

import { PermissionMapper } from '../mapper';

import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../../common';

import {
  LoggerPort,
  PaginationDto,
  PaginationResponseDto,
  TOKEN_LOGGER_PORT,
} from '../../../../utils';

export class FindPermissionsRepositoryAdapter
  implements FindPermissionsRepositoryPort
{
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async findByIds(ids: string[]): Promise<PermissionsResponseDto[] | null> {
    try {
      const response = await this.permissionsRepository
        .createQueryBuilder('p')
        .where('p.id IN (:...ids)', { ids })
        .getMany();

      return response.map(PermissionMapper.toDto);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }

  async findOne(id: string): Promise<PermissionsResponseDto | null> {
    try {
      const response = await this.permissionsRepository.findOne({
        where: { id },
      });

      if (!response) {
        return null;
      }

      return PermissionMapper.toDto(response);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }

  async findMany({
    limit,
    page,
    search,
    sort,
  }: PaginationDto): Promise<PaginationResponseDto<PermissionsResponseDto>> {
    try {
      const options: FindManyOptions<Permission> = {
        where: {
          ...(search && { name: ILike(`%${search}%`) }),
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          [sort]: 'ASC',
        },
      };
      const [result, total] =
        await this.permissionsRepository.findAndCount(options);
      const resultDto = result.map(PermissionMapper.toDto);
      const response: PaginationResponseDto<PermissionsResponseDto> = {
        data: resultDto,
        page,
        limit,
        total,
      };
      return response;
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
