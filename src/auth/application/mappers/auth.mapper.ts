import { UserResponseDto } from '../../../users/application';
import { AuthResponseDto, TokenResponseDto } from '../dtos';

export class AuthMapper {
  public static toDto(
    paramsDto: UserResponseDto,
    token: TokenResponseDto,
  ): AuthResponseDto {
    const dto = new AuthResponseDto();
    dto.id = paramsDto.id;
    dto.email = paramsDto.email;
    dto.tokens = token;
    return dto;
  }
}
