import { PermissionsReponseDto } from '../../../permissions';

export class RolesReponseDocDto {
  id: number;
  name: string;
  permissions: PermissionsReponseDto[];
  created_at: Date;
  updated_at: Date;
}
