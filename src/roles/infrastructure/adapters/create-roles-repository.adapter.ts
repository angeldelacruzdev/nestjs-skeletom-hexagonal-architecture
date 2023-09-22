import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRolesDto,
  CreateRolesRepositoryPort,
  RolesReponseDto,
} from '../../application';
import { Repository } from 'typeorm';
import { Role } from '../../domain/entities/roles.entity';

export class CreateRolesRepositoryAdapter implements CreateRolesRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(dto: CreateRolesDto): Promise<RolesReponseDto> {
    throw new Error('Method not implemented.');
  }
}
