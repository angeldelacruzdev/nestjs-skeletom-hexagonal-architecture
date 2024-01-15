import { UserResponseDto } from './../../../users/application';
import { RegisterResponseDto } from './../../../auth/application';

export class AuthMapper {
  public static toDto(dataDto: UserResponseDto): RegisterResponseDto {
    const dto = new RegisterResponseDto();
    dto.id = dataDto.id;
    dto.email = dataDto.email;
    dto.status = dataDto.status;
    dto.terms = dataDto.terms;
    return dto;
  }
}
