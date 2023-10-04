import { ExceptionHandlerPort } from '../../../common';
import { RolesReponseDto } from '../dtos';
import { AssignPermissionsToRoleRepositoryPort } from '../ports';

export class AssignPermissionsToRoleUseCase {
  constructor(
    private readonly assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto> {
    return;
  }
}
