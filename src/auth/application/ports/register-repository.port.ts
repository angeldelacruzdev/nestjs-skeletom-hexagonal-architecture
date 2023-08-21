import { RegisterDto } from '../dtos';

export interface RegisterRepositoryPort {
  register(dto: RegisterDto): Promise<RegisterDto>;
}
