import { ExceptionHandlerPort } from '../../../common';
import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { RolesResponseDto } from '../dto';
import { FindRolesRepositoryPort } from '../ports';

export class FindRolesUseCase {
  constructor(
    private readonly findRolesRepositoryPort: FindRolesRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<RolesResponseDto> | null> {
    try {
      return await this.findRolesRepositoryPort.findMany(pagination);
    } catch (e) {
      return this.exceptionHandlerPort.handle(e);
    }
  }

  async findOne(id: number): Promise<RolesResponseDto | null> {
    try {
      const response = await this.findRolesRepositoryPort.findOne(id);
      return response;
    } catch (e) {
      return this.exceptionHandlerPort.handle(e);
    }
  }
}
