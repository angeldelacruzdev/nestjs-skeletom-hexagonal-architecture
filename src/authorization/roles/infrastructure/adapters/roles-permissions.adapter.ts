import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsResponseDto } from '../../../permissions';
import { RolesPermissionsPort, RolesResponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

import { RolesMapper } from '../mappers';
import { RoleInternalErrorException } from '../../role-exception';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../../utils';

export class RolesPermissionsAdapter implements RolesPermissionsPort {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasRole(userId: string, roleId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
