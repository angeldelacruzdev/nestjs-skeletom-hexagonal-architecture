import { PermissionsResponseDto } from '../../../permissions';

export class RolesReponseDocDto {
  id: string;
  name: string;
  permissions: PermissionsResponseDto[];
  created_at: Date;
  updated_at: Date;
}
