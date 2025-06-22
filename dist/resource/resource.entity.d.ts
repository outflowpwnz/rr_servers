import { Message } from 'src/message/message.entity';
import { TgUser } from 'src/tg-user/tg-user.entity';
export declare class Resource {
    id: number;
    description: string;
    url: string;
    isFree: boolean;
    tgUser: TgUser | null;
    endMessage: Message | null;
    updatedAt: Date;
}
