import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from "../../../common/exceptions";
import { Inject } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginDto, AuthRepositoryPort, LoginResponseDto } from "../../application";


export class AuthRepositoryAdapter implements AuthRepositoryPort {
    constructor(
        private jwtService: JwtService,
        @Inject(EXCEPTION_HANDLER_PORT)
        private readonly exceptionHandler: ExceptionHandlerPort,
    ) { }
    refreshToken(user: LoginDto): Promise<{ refresh_token: string; }> {
        throw new Error("Method not implemented."); // NOTE: agregar el refresh token desde un endoint
    }

    async login({ id, email }: { id: number, email: string }): Promise<{ access_token: string, refresh_token: string; }> {

        try {
            const [at, rt] = await Promise.all([
                this.jwtService.signAsync(
                    {
                        sub: id,
                        email: email,
                    },
                    {
                        secret: process.env.JWT_SECRET,
                        expiresIn: '24h',
                    },
                ), this.jwtService.signAsync(
                    {
                        sub: id,
                        email,
                    },
                    {
                        secret: process.env.JWT_REFRESH_SECRET,
                        expiresIn: '30d',
                    },
                )
            ]);

            return {
                access_token: at,
                refresh_token: rt,
            };
        } catch (error) {
            return this.exceptionHandler.handle(error)
        }
    }
}