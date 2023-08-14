import { TokenDto } from "./token-reponse.dto";
export interface LoginResponseDto {
    id: number;
    LoginName: string;
    tokens: TokenDto;
    loginDate: Date;
}