import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { ResourceModule } from './resource/resource.module';
import { TgUserModule } from './tg-user/tg-user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    ResourceModule,
    TgUserModule,
    ScheduleModule.forRoot(),
    DatabaseModule,
    RoleModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
