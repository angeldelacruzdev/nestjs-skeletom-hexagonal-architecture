import { PermissionsReponseDto } from '../../../permissions/application';

export class RolesReponseDto {
  id: number;
  name: string;
  permissions: PermissionsReponseDto[];
  created_at: Date;
  updated_at: Date;
}
