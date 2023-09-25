import {
  CreatePermissionDto,
  CreatePermissionsRepositoryPort,
  PermissionsReponseDto,
} from '../../application';

export class CreatePermissionsRepositoryAdapter
  implements CreatePermissionsRepositoryPort
{
  create(dto: CreatePermissionDto): Promise<PermissionsReponseDto> {
    console.log(dto);

    throw new Error('Method not implemented.');
  }
}
