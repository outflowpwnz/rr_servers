import { DataSource } from 'typeorm';
import { TgUser } from './tg-user.entity';

export const TG_USER_REPOSITORY = 'TG_USER_REPOSITORY'

export const tgUserProviders = [
  {
    provide: TG_USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TgUser),
    inject: ['DATA_SOURCE'],
  },
];