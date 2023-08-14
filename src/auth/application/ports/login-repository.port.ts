import { LoginDto, LoginResponseDto } from "../dtos";

export interface LoginRepositoryPort {
    login(dto: LoginDto): Promise<LoginResponseDto>;
}