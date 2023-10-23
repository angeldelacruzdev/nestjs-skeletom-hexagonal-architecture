import { ExceptionHandlerPort } from '../../../common';
import { FindPermissionsUseCase } from '../../../permissions';
import { RolesReponseDto } from '../dtos';
import { RolesPermissionsPort } from '../ports';

export class RolesPermissionsUseCase {
  constructor(
    private readonly rolesPermissionsPort: RolesPermissionsPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
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
  ): Promise<RolesReponseDto> {
    try {
      const responseFindPermissionIds =
        await this.findPermissionsUseCase.findByIds(permissionIds);

      return await this.rolesPermissionsPort.assignPermissionsToRole(
        roleId,
        responseFindPermissionIds,
      );
    } catch (error) {
      this.exceptionHandlerPort.handle(error);
    }
  }
}
