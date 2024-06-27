import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRolesDto,
  CreateRolesRepositoryPort,
  RolesResponseDto,
} from '../../application';
import { Repository } from 'typeorm';
import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';

import { Inject } from '@nestjs/common';

import { RoleInternalErrorException } from '../../role-exception';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../../utils';

export class CreateRolesRepositoryAdapter implements CreateRolesRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async create(dto: CreateRolesDto): Promise<RolesResponseDto | null> {
    try {
      const entity = RolesMapper.toEntity(dto);
      const response = await this.roleRepository.save(entity);
      return RolesMapper.toDto(response);
    } catch (e) {
      this.logger.error(e);
      throw new RoleInternalErrorException();
    }
  }
}
