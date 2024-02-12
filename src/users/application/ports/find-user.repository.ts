import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { UserResponseDto } from '../dtos';
export interface FindUserRepositoryPort {
  findMany(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<UserResponseDto> | null>;
  findUserByid(id: string): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<UserResponseDto>;
  findUserRtHash(id: string, token: string): Promise<string>;
  findRtHashByUserId(id: string): Promise<string>;
}
