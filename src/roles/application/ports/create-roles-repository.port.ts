import { CreateRolesDto, RolesReponseDto } from '../dtos';

export interface CreateRolesRepositoryPort {
  create(dto: CreateRolesDto): Promise<RolesReponseDto | null>;
}
