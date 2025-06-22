import { DataSource } from 'typeorm';
import { Role } from './role.entity';
export declare const ROLE_REPOSITORY = "ROLE_REPOSITORY";
export declare const roleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Role>;
    inject: string[];
}[];
