import { PermissionsResponseDto } from '../../../permissions/application';

export class RolesResponseDto {
  id: number;
  name: string;
  permissions: PermissionsResponseDto[];
  created_at: Date;
  updated_at: Date;
}
