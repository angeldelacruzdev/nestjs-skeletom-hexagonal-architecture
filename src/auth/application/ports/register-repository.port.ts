import { AuthRegisterDto, RegisterResponseDto } from '../dtos';

export interface RegisterRepositoryPort {
  register(dto: AuthRegisterDto): Promise<RegisterResponseDto>;
}
