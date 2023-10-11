export interface RolesPermissionsRepositoryPort {
  hasRole(userId: string, roleId: string): Promise<boolean>;
}
