import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsReponseDto } from '../../../permissions';
import { RolesPermissionsPort, RolesReponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';
import { Repository } from 'typeorm';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { Inject } from '@nestjs/common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';
import { RolesMapper } from '../mappers';

export class RolesPermissionsAdapter implements RolesPermissionsPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async assignPermissionsToRole(
    roleId: number,
    permissionIds: PermissionsReponseDto[],
  ): Promise<RolesReponseDto> {
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
  hasRole(userId: string, roleId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
