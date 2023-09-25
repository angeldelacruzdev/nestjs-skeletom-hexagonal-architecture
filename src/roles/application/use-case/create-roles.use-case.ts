import { CreateRolesDto, RolesReponseDto } from '../dtos';
import { CreateRolesRepositoryPort } from './../ports';

export class CreateRolesUseCase {
  constructor(
    private readonly createRolesRepositoryPort: CreateRolesRepositoryPort,
  ) {}

  async create(dto: CreateRolesDto): Promise<RolesReponseDto | null> {
    const createResult = await this.createRolesRepositoryPort.create(dto);

    console.log(createResult);
    return;
  }
}
