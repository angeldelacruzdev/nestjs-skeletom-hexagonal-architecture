import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { PermissionsReponseDto } from '../dto';
import { FindPermissionsRepositoryPort } from '../ports';

export class FindPermissionsUseCase {
  constructor(
    private readonly findPermissionsRepositoryPort: FindPermissionsRepositoryPort,
  ) {}

  async findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<PermissionsReponseDto> | null> {
    return await this.findPermissionsRepositoryPort.findMany(pagination);
  }

  async findOne(id: number): Promise<PermissionsReponseDto | null> {
    return await this.findPermissionsRepositoryPort.findOne(id);
  }

  async findByIds(ids: number[]): Promise<PermissionsReponseDto[] | null> {
    return await this.findPermissionsRepositoryPort.findByIds(ids);
  }
}
