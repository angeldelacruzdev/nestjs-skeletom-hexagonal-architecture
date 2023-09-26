import { PaginationDto } from '../../../utils';
import { RolesReponseDto } from '../dtos';

export interface FindRolesRepositoryPort {
  findMany(pagination: PaginationDto): Promise<RolesReponseDto[] | null>;
}
