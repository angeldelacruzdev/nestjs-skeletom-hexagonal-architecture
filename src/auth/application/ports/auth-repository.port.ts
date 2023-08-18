import { LoginDto, LoginResponseDto, TokenDto } from "../dtos";

export interface AuthRepositoryPort {
    login(dto: { id: number, email: string }): Promise<TokenDto>;
    refreshToken(user: LoginDto): Promise<{ refresh_token: string }>;
}