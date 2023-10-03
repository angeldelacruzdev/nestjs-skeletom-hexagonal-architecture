export interface AssignPermissionsToRoleRepositoryPort {
  assignPermissionsToRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<any>;
}
