import { ExceptionHandlerPort } from '../../../common';
import { FindPermissionsUseCase } from '../../../permissions';
import { RolesReponseDto } from '../dtos';
import { AssignPermissionsToRoleRepositoryPort } from '../ports';

export class AssignPermissionsToRoleUseCase {
  constructor(
    private readonly assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
  ) {}

  async assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto> {
    const responseFindPermissionIds =
      await this.findPermissionsUseCase.findByIds(permissionIds);

      console.log(responseFindPermissionIds)

    return;
    return await this.assignPermissionsToRoleRepositoryPort.assignPermissionsToRole(
      roleId,
      permissionIds,
    );
  }
}
