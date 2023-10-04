import { RolesReponseDto } from '../dtos';
import { AssignPermissionsToRoleRepositoryPort } from '../ports';

export class AssignPermissionsToRoleUseCase {
  constructor(
    private readonly assignPermissionsToRoleRepositoryPort: AssignPermissionsToRoleRepositoryPort,
  ) {}

  assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<RolesReponseDto> {
    
    return;
  }
}
