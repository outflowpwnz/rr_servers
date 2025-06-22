import { DataSource } from 'typeorm';
import { Message } from './message.entity';
export declare const MESSAGE_REPOSITORY = "MESSAGE_REPOSITORY";
export declare const messageProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Message>;
    inject: string[];
}[];
