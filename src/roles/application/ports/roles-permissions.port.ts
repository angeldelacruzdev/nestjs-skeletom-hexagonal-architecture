import { PermissionsReponseDto } from '../../../permissions';
import { RolesReponseDto } from '../dtos';

export interface RolesPermissionsPort {
  assignPermissionsToRole(
    roleId: number,
    permissionIds: PermissionsReponseDto[],
  ): Promise<RolesReponseDto>;
  hasRole(userId: string, roleId: string): Promise<boolean>;
}
