import { RefreshTokenHttpDto } from '../dto';

export class HttpMapper {
  public static toDto(
    refreshToken: string,
    userId: string,
  ): RefreshTokenHttpDto {
    const dto = new RefreshTokenHttpDto();
    dto.id = userId;
    dto.refresh_token = refreshToken;
    return dto;
  }
}
