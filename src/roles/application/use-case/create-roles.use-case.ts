import { ExceptionHandlerPort } from '../../../common';
import { CreateRolesDto, RolesReponseDto } from '../dtos';
import { CreateRolesRepositoryPort } from './../ports';

export class CreateRolesUseCase {
  constructor(
    private readonly createRolesRepositoryPort: CreateRolesRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async create(dto: CreateRolesDto): Promise<RolesReponseDto | null> {
    try {
      const createResult = await this.createRolesRepositoryPort.create(dto);
      return createResult;
    } catch (e) {
      return this.exceptionHandlerPort.handle(e);
    }
  }
}
