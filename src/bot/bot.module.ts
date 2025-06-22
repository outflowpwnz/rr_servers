import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { BotUpdate } from './bot.update';
import { TakeResource } from './scenes/take-resource.scene'
import { session } from 'telegraf';
import { ResourceModule } from 'src/resource/resource.module';
import { BotHelpers } from './bot.helpers';
import { FreeResource } from './scenes/free-resource.scene';
import { TgUserModule } from 'src/tg-user/tg-user.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN')!,
        middlewares: [session()],
      }),
    }),
    ResourceModule,
    TgUserModule
  ],
  providers: [
    BotHelpers,
    BotService,
    BotUpdate,
    TakeResource,
    FreeResource,
  ],
})
export class BotModule {}
