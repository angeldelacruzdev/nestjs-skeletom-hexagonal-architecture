export interface DeletePermissionsRepositoryPort {
  delete(id: string): Promise<boolean | null>;
}
