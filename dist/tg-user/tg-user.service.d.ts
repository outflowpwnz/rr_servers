import { Repository } from 'typeorm';
import { TgUser } from './tg-user.entity';
export declare class TgUserService {
    private tgUserRepository;
    constructor(tgUserRepository: Repository<TgUser>);
    getTgUser(tgUserId?: number): Promise<TgUser | null>;
    getTgUsers(): Promise<TgUser[]>;
}
