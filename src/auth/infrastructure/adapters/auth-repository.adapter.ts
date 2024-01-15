import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
} from '../../../common/exceptions';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthDto,
  AuthRepositoryPort,
  TokenResponseDto,
} from '../../application';

export class AuthRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    private jwtService: JwtService,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
  ) {}

  async login(dto: AuthDto): Promise<TokenResponseDto> {
    try {
      return;
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }

  refreshToken(dto: AuthDto): Promise<TokenResponseDto> {
    return;
  }
}
