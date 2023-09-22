import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class UserController {
  constructor() {}
}
