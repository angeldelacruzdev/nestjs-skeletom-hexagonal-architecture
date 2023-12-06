import { ExceptionHandlerPort } from '../../../common';
import { HttpException } from '../../../common/http-exceptions/http-exception';
import { FindPermissionsUseCase } from '../../../permissions';
import { RolesResponseDto } from '../dto';
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
  ): Promise<RolesResponseDto> {
    try {
      const responseFindPermissionIds =
        await this.findPermissionsUseCase.findByIds(permissionIds);

      return await this.rolesPermissionsPort.assignPermissionsToRole(
        roleId,
        responseFindPermissionIds,
      );
    } catch (error) {
       new HttpException("Error del servidor", "No sabemos cual es el error", "stacks.....");
    }
  }
}
