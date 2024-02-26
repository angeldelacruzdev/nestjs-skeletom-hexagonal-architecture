import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  AssignPermissionsToRoleRepositoryPort,
  RolesResponseDto,
} from '../../application';

import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';
import { PermissionsResponseDto } from '../../../permissions';
import { RoleInternalErrorException } from '../../role-exception';

export class AssignPermissionsToRoleRepositoryAdapter
  implements AssignPermissionsToRoleRepositoryPort
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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
      throw new RoleInternalErrorException();
    }
  }
}
