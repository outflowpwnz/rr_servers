// import { Module } from '@nestjs/common';
// import { TgUserService } from './tg-user.service';
// import { TgUserController } from './tg-user.controller';

// @Module({
//   controllers: [TgUserController],
//   providers: [TgUserService],
// })
// export class TgUserModule {}


import { Module } from '@nestjs/common';
import { TgUserService } from './tg-user.service';
import { TgUserController } from './tg-user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tgUserProviders } from './tg-user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TgUserController],
  providers: [
    ...tgUserProviders,
    TgUserService,
  ],
  exports: [TgUserService]
})
export class TgUserModule {}
