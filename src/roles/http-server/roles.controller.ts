import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreateRolesDocDto, RolesReponseDocDto } from './dtos';
import {
  AssignPermissionsToRoleUseCase,
  CreateRolesUseCase,
  FindRolesUseCase,
} from '../application/use-case';
import { Pagination } from '../../common';
import { PaginationDocDto } from '../../utils/dto/pagination-doc.dto';
import { PaginationResponseDto } from '../../utils';
import { RolesReponseDto } from '../application';

import { PermissionsIdsDocDto } from '../../permissions/http-server';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(
    private readonly createRolesUseCase: CreateRolesUseCase,
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly AssignPermissionsToRoleUseCase: AssignPermissionsToRoleUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRolesDocDto): Promise<RolesReponseDocDto> {
    return await this.createRolesUseCase.create(body);
  }

  @Get()
  async findMany(
    @Pagination() pagination: PaginationDocDto,
  ): Promise<PaginationResponseDto<RolesReponseDto>> {
    return await this.findRolesUseCase.findMany(pagination);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RolesReponseDocDto> {
    return await this.findRolesUseCase.findOne(id);
  }

  @Get(':id/assign-permissions')
  async assignPermissions(
    @Param('id') id: number,
    @Body() { permissionIds }: PermissionsIdsDocDto,
  ): Promise<RolesReponseDocDto> {
    return await this.AssignPermissionsToRoleUseCase.assignPermissionsToRole(
      id,
      permissionIds,
    );
  }
}
