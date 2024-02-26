import { RoleInternalErrorException } from '../../role-exception';
import { CreateRolesDto, RolesResponseDto } from '../dto';
import { CreateRolesRepositoryPort } from './../ports';

export class CreateRolesUseCase {
  constructor(
    private readonly createRolesRepositoryPort: CreateRolesRepositoryPort,
  ) {}

  async create(dto: CreateRolesDto): Promise<RolesResponseDto | null> {
    try {
      const createResult = await this.createRolesRepositoryPort.create(dto);
      return createResult;
    } catch (e) {
      throw new RoleInternalErrorException();
    }
  }
}
