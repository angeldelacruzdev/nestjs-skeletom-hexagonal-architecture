import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: 'v1/permissions',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {}
