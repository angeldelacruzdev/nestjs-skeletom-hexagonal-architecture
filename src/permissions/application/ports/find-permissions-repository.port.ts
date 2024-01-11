import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { PermissionsResponseDto } from '../dto';

export interface FindPermissionsRepositoryPort {
  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<PermissionsResponseDto> | null>;
  findOne(id: string): Promise<PermissionsResponseDto | null>;
  findByIds(ids: string[]): Promise<PermissionsResponseDto[] | null>;
}
