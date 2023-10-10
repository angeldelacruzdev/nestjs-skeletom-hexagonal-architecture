import { DeletePermissionsRepositoryPort } from '../ports';

export class DeletePermissionsUseCase {
  constructor(
    private readonly deletePermissionsRepositoryPort: DeletePermissionsRepositoryPort,
  ) {}

  async delete(id: number): Promise<boolean | null> {
    return await this.deletePermissionsRepositoryPort.delete(id);
  }
}
