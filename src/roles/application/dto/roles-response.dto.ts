import { PermissionsResponseDto } from '../../../permissions/application';

export class RolesResponseDto {
  id: string;
  name: string;
  permissions: PermissionsResponseDto[];
  created_at: Date;
  updated_at: Date;
}
