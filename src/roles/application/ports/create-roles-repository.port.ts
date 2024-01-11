import { RolesReponseDocDto } from '../../http-server/dtos';
import { CreateRolesDto } from '../dto';

export interface CreateRolesRepositoryPort {
  create(dto: CreateRolesDto): Promise<RolesReponseDocDto | null>;
}
