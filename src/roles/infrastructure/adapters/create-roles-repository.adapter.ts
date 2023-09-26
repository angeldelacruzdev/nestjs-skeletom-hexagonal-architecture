import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRolesDto,
  CreateRolesRepositoryPort,
  RolesReponseDto,
} from '../../application';
import { Repository } from 'typeorm';
import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { Inject } from '@nestjs/common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

export class CreateRolesRepositoryAdapter implements CreateRolesRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async create(dto: CreateRolesDto): Promise<RolesReponseDto> {
    try {
      const entity = RolesMapper.toEntity(dto);
      const response = await this.roleRepository.save(entity);
      return RolesMapper.toDto(response);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
