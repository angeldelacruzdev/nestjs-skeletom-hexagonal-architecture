import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { PermissionsReponseDto } from '../dto';

export interface FindPermissionsRepositoryPort {
  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<PermissionsReponseDto> | null>;

  findOne(id: number): Promise<PermissionsReponseDto>;
}
