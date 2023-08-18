import { TokenDto } from "auth/application";
export class AuthResponseHttpDto {
    id: number;
    name: string;
    tokens: TokenDto;
}