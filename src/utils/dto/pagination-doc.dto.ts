import { IsOptional } from 'class-validator';

export class PaginationDocDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  sort: string;
}
