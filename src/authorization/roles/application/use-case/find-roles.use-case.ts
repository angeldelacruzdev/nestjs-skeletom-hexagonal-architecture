import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { RoleInternalErrorException } from '../../role-exception';
import { RolesResponseDto } from '../dto';
import { FindRolesRepositoryPort } from '../ports';

export class FindRolesUseCase {
  constructor(
    private readonly findRolesRepositoryPort: FindRolesRepositoryPort,
  ) {}

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<RolesResponseDto> | null> {
    try {
      return await this.findRolesRepositoryPort.findMany(pagination);
    } catch (e) {
      throw new RoleInternalErrorException();
    }
  }

  async findOne(id: string): Promise<RolesResponseDto | null> {
    try {
      const response = await this.findRolesRepositoryPort.findOne(id);
      return response;
    } catch (e) {
      throw new RoleInternalErrorException();
    }
  }
}
