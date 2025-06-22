import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const options: DataSourceOptions = {
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_LOGIN'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: true,
      };

      const dataSource = new DataSource(options);
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];