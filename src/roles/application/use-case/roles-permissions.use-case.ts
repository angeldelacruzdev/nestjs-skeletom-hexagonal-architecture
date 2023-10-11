import { RolesPermissionsRepositoryPort } from '../ports';

export class RolesPermissionsUseCase {
  constructor(
    private readonly rolesPermissionsRepositoryPort: RolesPermissionsRepositoryPort,
  ) {}

  async hasRole(userId: string, roleId: string): Promise<boolean> {
    console.log(userId, roleId);

    const result = await this.rolesPermissionsRepositoryPort.hasRole(
      userId,
      roleId,
    );

    console.log(result);

    return;
  }
}
