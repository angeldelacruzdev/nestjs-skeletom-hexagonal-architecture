import { ExceptionHandlerPort } from '../../../common';
import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { RolesReponseDto } from '../dtos';
import { FindRolesRepositoryPort } from '../ports';

export class FindRolesUseCase {
  constructor(
    private readonly findRolesRepositoryPort: FindRolesRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<RolesReponseDto> | null> {
    try {
      return await this.findRolesRepositoryPort.findMany(pagination);
    } catch (e) {
      return this.exceptionHandlerPort.handle(e)
    }
  }
}
