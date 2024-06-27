import { FindPermissionsUseCase } from '../../../permissions';
import { RoleInternalErrorException } from '../../role-exception';
import { RolesResponseDto } from '../dto';
import { RolesPermissionsPort } from '../ports';

export class RolesPermissionsUseCase {
  constructor(
    private readonly rolesPermissionsPort: RolesPermissionsPort,
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
  ) {}

  async hasRole(userId: string, roleId: string): Promise<boolean> {
    console.log(userId, roleId);

    const result = await this.rolesPermissionsPort.hasRole(userId, roleId);

    console.log(result);

    return;
  }

  async assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesResponseDto> {
    try {
      console.log(roleId, permissionIds);
      // const responseFindPermissionIds =
      //   await this.findPermissionsUseCase.findByIds(permissionIds);

      // return await this.rolesPermissionsPort.assignPermissionsToRole(
      //   roleId,
      //   responseFindPermissionIds,
      // );

      return;
    } catch (error) {
      throw new RoleInternalErrorException();
    }
  }
}
