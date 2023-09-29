export interface UpdateRolesRepositoryPort {
  updateOne(id: number, dto: any): Promise<any>;
}
