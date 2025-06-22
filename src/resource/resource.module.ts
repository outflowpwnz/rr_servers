import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TgUserModule } from 'src/tg-user/tg-user.module';
import { resourceProviders } from './resource.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TgUserModule],
  controllers: [ResourceController],
  providers: [
    ...resourceProviders,
    ResourceService
  ],
  exports: [ResourceService]
})
export class ResourceModule {}
