import { DataSource } from 'typeorm';
import { Message } from './message.entity';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY'

export const messageProviders = [
  {
    provide: MESSAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
    inject: ['DATA_SOURCE'],
  },
];