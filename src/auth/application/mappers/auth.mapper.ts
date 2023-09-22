import { UserResponseDto } from '../../../users/application';
import { AuthResponseDto, TokenDto } from '../dtos';

export class AuthMapper {
  public static toDto(
    dtoParam: UserResponseDto,
    token: TokenDto,
  ): AuthResponseDto {
    const dto = new AuthResponseDto();
    dto.id = dtoParam.id;
    dto.email = dtoParam.email;
    dto.tokens = token;
    return dto;
  }
}