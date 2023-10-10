export interface DeletePermissionsRepositoryPort {
  delete(id: number): Promise<boolean | null>;
}
