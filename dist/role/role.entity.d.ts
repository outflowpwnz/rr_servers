import { TgUser } from 'src/tg-user/tg-user.entity';
export declare class Role {
    id: number;
    name: string;
    tgUsers: TgUser[];
}
