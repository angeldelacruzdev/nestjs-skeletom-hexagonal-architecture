import { FindPermissionsUseCase } from '../../../permissions';
import { RoleInternalErrorException } from '../../role-exception';
import { RolesResponseDto } from '../dto';
import { AssignPermissionsToRoleRepositoryPort } from '../ports';

export class AssignPermissionsToRoleUseCase {
  constructor(
    private readonly assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
  ) {}

  async assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesResponseDto> {
    try {
      console.log(roleId, permissionIds);
      // const responseFindPermissionIds =
      //   await this.findPermissionsUseCase.findByIds(permissionIds);

      // return await this.assignPermissionsToRoleRepositoryPort.assignPermissionsToRole(
      //   roleId,
      //   responseFindPermissionIds,
      // );

      return;
    } catch (error) {
      throw new RoleInternalErrorException();
    }
  }
}
