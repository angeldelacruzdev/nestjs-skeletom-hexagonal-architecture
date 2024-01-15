import { AuthRegisterDto } from '../dtos';
import { RegisterRepositoryPort } from '../ports';

export class RegisterUseCase {
  constructor(
    private readonly registerRepositoryPort: RegisterRepositoryPort,
  ) {}

  async register(dto: AuthRegisterDto): Promise<any> {
    const response = await this.registerRepositoryPort.register(dto);
    return response;
  }
}
