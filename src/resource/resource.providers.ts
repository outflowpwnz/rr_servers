import { DataSource } from 'typeorm';
import { Resource } from './resource.entity';

export const RESOURCE_REPOSITORY = 'RESOURCE_REPOSITORY'

export const resourceProviders = [
  {
    provide: RESOURCE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Resource),
    inject: ['DATA_SOURCE'],
  },
];