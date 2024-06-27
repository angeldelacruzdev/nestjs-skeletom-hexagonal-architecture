import { PaginationDto, PaginationResponseDto } from '../../../../utils';
import { PermissionsResponseDto } from '../dto';
import { FindPermissionsRepositoryPort } from '../ports';

export class FindPermissionsUseCase {
  constructor(
    private readonly findPermissionsRepositoryPort: FindPermissionsRepositoryPort,
  ) {}

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<PermissionsResponseDto> | null> {
    return await this.findPermissionsRepositoryPort.findMany(pagination);
  }

  async findOne(id: string): Promise<PermissionsResponseDto | null> {
    return await this.findPermissionsRepositoryPort.findOne(id);
  }

  async findByIds(ids: string[]): Promise<PermissionsResponseDto[] | null> {
    return await this.findPermissionsRepositoryPort.findByIds(ids);
  }
}
