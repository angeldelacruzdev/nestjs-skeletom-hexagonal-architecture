import { ExceptionHandlerPort } from '../../../common';
import { RolesReponseDto } from '../dtos';
import { AssignPermissionsToRoleRepositoryPort } from '../ports';

export class AssignPermissionsToRoleUseCase {
  constructor(
    private readonly assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto> {
    return await this.assignPermissionsToRoleRepositoryPort.assignPermissionsToRole(
      roleId,
      permissionIds,
    );
  }
}
