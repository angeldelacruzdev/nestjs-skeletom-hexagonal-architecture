import { PermissionsReponseDto } from '../../../permissions';
import { RolesReponseDto } from '../dtos';

export interface AssignPermissionsToRoleRepositoryPort {
  assignPermissionsToRole(
    roleId: number,
    permissionIds: PermissionsReponseDto[],
  ): Promise<RolesReponseDto>;
}
