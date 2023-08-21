import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthRepositoryPort, TokenDto } from '../../application';

export class AuthRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    private jwtService: JwtService,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) {}

  refreshToken(dto: AuthDto): Promise<TokenDto> {
    try {
      return this.generateTokens(dto);
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  async login(dto: AuthDto): Promise<TokenDto> {
    try {
      return this.generateTokens(dto);
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  private async generateTokens({ id, email }: AuthDto): Promise<TokenDto> {
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
        ),
        this.jwtService.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d',
          },
        ),
      ]);

      return {
        access_token: at,
        refresh_token: rt,
      };
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
