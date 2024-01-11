import { IsOptional } from 'class-validator';

export class PermissionsIdsDocDto {
  @IsOptional()
  permissionIds: string[];
}
