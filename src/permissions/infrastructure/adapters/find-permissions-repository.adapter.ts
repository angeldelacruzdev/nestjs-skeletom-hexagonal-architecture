import { FindManyOptions, ILike, Repository } from 'typeorm';
import {
  LoggerPort,
  PaginationDto,
  PaginationResponseDto,
  TOKEN_LOGGER_PORT,
} from '../../../utils';
import { Permission } from '../../domain/permission.entity';

import {
  FindPermissionsRepositoryPort,
  PermissionsReponseDto,
} from './../../application';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { PermissionMapper } from '../mapper';

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

  async findOne(id: number): Promise<PermissionsReponseDto> {
    try {
      const response = await this.permissionsRepository.findOne({
        where: { id },
      });

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
  }: PaginationDto): Promise<PaginationResponseDto<PermissionsReponseDto>> {
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
      const response: PaginationResponseDto<PermissionsReponseDto> = {
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
