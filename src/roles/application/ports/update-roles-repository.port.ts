export interface UpdateRolesRepositoryPort {
  updateOne(id: string, dto: any): Promise<any>;
}
