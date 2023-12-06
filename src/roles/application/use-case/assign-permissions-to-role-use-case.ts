import { FindPermissionsUseCase } from '../../../permissions';
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
    const responseFindPermissionIds =
      await this.findPermissionsUseCase.findByIds(permissionIds);

    return await this.assignPermissionsToRoleRepositoryPort.assignPermissionsToRole(
      roleId,
      responseFindPermissionIds,
    );
  }
}
