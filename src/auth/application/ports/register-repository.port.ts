import { AuthRegisterDto } from '../dtos';

export interface RegisterRepositoryPort {
  register(dto: AuthRegisterDto): Promise<AuthRegisterDto>;
}
