import { ExceptionHandlerPort } from '../../../common';
import { PaginationDto } from '../../../utils';
import { RolesReponseDto } from '../dtos';
import { FindRolesRepositoryPort } from '../ports';

export class FindRolesUseCase {
  constructor(
    private readonly findRolesRepositoryPort: FindRolesRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async findMany(pagination: PaginationDto): Promise<RolesReponseDto[] | null> {
    return;
  }
}
