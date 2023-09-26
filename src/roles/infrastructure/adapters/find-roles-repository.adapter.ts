import { PaginationDto } from '../../../utils';
import { RolesReponseDto } from '../../application';
import { FindRolesRepositoryPort } from './../../application/ports/find-roles-repository.port';
export class FindRolesRepositoryAdapter implements FindRolesRepositoryPort {
  async findMany(pagination: PaginationDto): Promise<RolesReponseDto[]> {
    throw new Error('Method not implemented.');
  }
}
