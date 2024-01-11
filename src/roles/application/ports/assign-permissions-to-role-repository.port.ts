import { PermissionsResponseDto } from '../../../permissions';
import { RolesResponseDto } from '../dto';

export interface AssignPermissionsToRoleRepositoryPort {
  assignPermissionsToRole(
    roleId: string,
    permissionIds: PermissionsResponseDto[],
  ): Promise<RolesResponseDto>;
}
