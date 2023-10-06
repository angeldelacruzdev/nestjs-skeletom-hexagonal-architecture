import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindPermissionsRepositoryPort,
  PermissionsReponseDto,
  UpdatePermissionsDto,
  UpdatePermissionsRepositoryPort,
} from './../../application';

import { Permission } from '../../domain/permission.entity';

import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';
import { PermissionMapper } from '../mapper';
import { FIND_PERMISSION_REPOSITORY } from '../../tokens';

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
    id: number,
    dto: UpdatePermissionsDto,
  ): Promise<PermissionsReponseDto> {
    try {
      const entity = PermissionMapper.toUpdate(id, dto);
      const response = await this.permissionsRepository.save(entity);

      return this.findPermissionsRepositoryPort.findOne(response.id);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
