import { ExceptionHandlerPort } from './../../../common/exceptions/exception-handler.port';
import { RegisterDto } from '../dtos';
import { RegisterRepositoryPort } from '../ports';

export class RegisterUseCase {
  constructor(
    private readonly registerRepositoryPort: RegisterRepositoryPort,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async register(dto: RegisterDto): Promise<any> {
    try {
      return await this.registerRepositoryPort.register(dto);
    } catch (error) {
      return this.exceptionHandlerPort.handle(error);
    }
  }
}
