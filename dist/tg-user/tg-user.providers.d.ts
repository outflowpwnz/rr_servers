import { DataSource } from 'typeorm';
import { TgUser } from './tg-user.entity';
export declare const TG_USER_REPOSITORY = "TG_USER_REPOSITORY";
export declare const tgUserProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<TgUser>;
    inject: string[];
}[];
