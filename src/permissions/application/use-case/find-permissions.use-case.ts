import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { PermissionsReponseDto } from '../dto';
import { FindPermissionsRepositoryPort } from '../ports';

export class FindPermissionsUseCase {
  constructor(
    private readonly findPermissionsRepositoryPort: FindPermissionsRepositoryPort,
  ) {}

  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<PermissionsReponseDto> | null> {
    console.log(pagination);
    return;
  }
}
