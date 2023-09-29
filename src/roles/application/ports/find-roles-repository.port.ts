import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { RolesReponseDto } from '../dtos';

export interface FindRolesRepositoryPort {
  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<RolesReponseDto> | null>;
  findOne(id: number): Promise<RolesReponseDto | null>;
}
