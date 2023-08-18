import { AuthDto, LoginDto, LoginResponseDto, TokenDto } from "../dtos";

export interface AuthRepositoryPort {
    login(dto: AuthDto): Promise<TokenDto>;
    refreshToken(user: AuthDto): Promise<TokenDto>;
}