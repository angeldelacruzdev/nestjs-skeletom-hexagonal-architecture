import { AuthBadRequestException } from '../../auth-exceptions';
import { AuthRegisterDto } from '../dtos';
import { RegisterRepositoryPort } from '../ports';

export class RegisterUseCase {
  constructor(
    private readonly registerRepositoryPort: RegisterRepositoryPort,
  ) {}

  async register(dto: AuthRegisterDto): Promise<any> {
    try {
      const response = await this.registerRepositoryPort.register(dto);
      if (!response) {
        throw new AuthBadRequestException(
          'Lo sentimos, no pudimos procesar la información, intente de nuevo.',
          400,
        );
      }
      return response;
    } catch (error) {
      throw new AuthBadRequestException(error.message, 400);
    }
  }
}
