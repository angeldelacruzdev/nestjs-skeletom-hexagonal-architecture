import { RolesReponseDto } from '../dtos';

export interface AssignPermissionsToRoleRepositoryPort {
  assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto>;
}
