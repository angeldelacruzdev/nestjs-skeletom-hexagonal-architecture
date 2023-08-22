import { ExceptionHandlerPort } from './../../../common/exceptions/exception-handler.port';
import { RegisterDto } from '../dtos';
import { RegisterRepositoryPort } from '../ports';

export class RegisterUseCase {
  constructor(
    private readonly registerRepositoryPort: RegisterRepositoryPort,
  ) {}

  async register(dto: RegisterDto): Promise<any> {
    const response = await this.registerRepositoryPort.register(dto);

    return response;
  }
}
