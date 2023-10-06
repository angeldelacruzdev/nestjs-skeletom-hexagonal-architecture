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
}
