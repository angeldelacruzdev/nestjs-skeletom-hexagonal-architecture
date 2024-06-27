import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindPermissionsRepositoryPort,
  PermissionsResponseDto,
  UpdatePermissionsDto,
  UpdatePermissionsRepositoryPort,
} from './../../application';

import { Permission } from '../../domain/permission.entity';

import { PermissionMapper } from '../mapper';

import { FIND_PERMISSION_REPOSITORY } from '../../tokens';

import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../../common';

import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../../utils';

export class UpdatePermissionsRepositoryAdapter
  implements UpdatePermissionsRepositoryPort
{
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
    @Inject(FIND_PERMISSION_REPOSITORY)
    private readonly findPermissionsRepositoryPort: FindPermissionsRepositoryPort,
  ) {}

  async update(
    id: string,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsResponseDto> {
    try {
      const entity = PermissionMapper.toUpdate(id, dto);
      const response = await this.permissionsRepository.save(entity);

      return await this.findPermissionsRepositoryPort.findOne(response.id);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
