import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  AssignPermissionsToRoleRepositoryPort,
  RolesResponseDto,
} from '../../application';

import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';
import { PermissionsResponseDto } from '../../../permissions';

export class AssignPermissionsToRoleRepositoryAdapter
  implements AssignPermissionsToRoleRepositoryPort
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async assignPermissionsToRole(
    roleId: string,
    permissionIds: PermissionsResponseDto[],
  ): Promise<RolesResponseDto> {
    try {
      const entity = RolesMapper.assignPermissionsEntity(roleId, permissionIds);
      console.log(entity);
      return;
      await this.roleRepository.save(entity);

      return;
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
