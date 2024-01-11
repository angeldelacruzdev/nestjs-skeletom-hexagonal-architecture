import { PermissionsResponseDto } from '../../../permissions';
import { RolesResponseDto } from '../dto';

export interface RolesPermissionsPort {
  assignPermissionsToRole(
    roleId: string,
    permissionIds: PermissionsResponseDto[],
  ): Promise<RolesResponseDto>;
  hasRole(userId: string, roleId: string): Promise<boolean>;
}
