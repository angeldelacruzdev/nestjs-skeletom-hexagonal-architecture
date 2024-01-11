import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { RolesResponseDto } from '../dto';

export interface FindRolesRepositoryPort {
  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<RolesResponseDto> | null>;
  findOne(id: string): Promise<RolesResponseDto | null>;
}
