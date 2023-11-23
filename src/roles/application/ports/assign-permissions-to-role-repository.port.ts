import { PermissionsResponseDto } from '../../../permissions';
import { RolesResponseDto } from '../dtos';

export interface AssignPermissionsToRoleRepositoryPort {
  assignPermissionsToRole(
    roleId: number,
    permissionIds: PermissionsResponseDto[],
  ): Promise<RolesResponseDto>;
}
