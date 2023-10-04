import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  AssignPermissionsToRoleRepositoryPort,
  RolesReponseDto,
} from '../../application';

import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

import { Role } from '../../domain/entities/roles.entity';

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

  assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto> {
    try {
      console.log(roleId, permissionIds);
      

      return;
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
