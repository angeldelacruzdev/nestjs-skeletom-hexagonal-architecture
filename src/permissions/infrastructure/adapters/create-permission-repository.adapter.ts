import { Repository } from 'typeorm';
import {
  CreatePermissionDto,
  CreatePermissionsRepositoryPort,
  PermissionsReponseDto,
} from '../../application';
import { Permission } from '../../domain/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';
import { PermissionMapper } from '../mapper';

export class CreatePermissionsRepositoryAdapter
  implements CreatePermissionsRepositoryPort
{
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async create(dto: CreatePermissionDto): Promise<PermissionsReponseDto> {
    try {
      const entity = PermissionMapper.toEntity(dto);
      const saved = await this.permissionsRepository.save(entity);
      return PermissionMapper.toDto(saved);
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }
}
