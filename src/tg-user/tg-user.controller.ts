import { Controller } from '@nestjs/common';
import { TgUserService } from './tg-user.service';

@Controller('tg-user')
export class TgUserController {
  constructor(private readonly tgUserService: TgUserService) {}
}
