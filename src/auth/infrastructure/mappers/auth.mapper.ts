import { UserResponseDto } from './../../../users/application';
import { RegisterReponseDto } from './../../../auth/application';

export class AuthMapper {
  public static toDto(dataDto: UserResponseDto): RegisterReponseDto {
    const dto = new RegisterReponseDto();
    dto.id = dataDto.id;
    dto.email = dataDto.email;
    dto.status = dataDto.status;
    dto.terms = dataDto.terms;
    return dto;
  }
}
