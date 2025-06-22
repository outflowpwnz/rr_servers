import { ResourceService } from 'src/resource/resource.service';
import { TgUserService } from 'src/tg-user/tg-user.service';
import { Telegraf } from 'telegraf';
export declare class BotService {
    private readonly resourceService;
    private readonly tgUserService;
    private readonly bot;
    constructor(resourceService: ResourceService, tgUserService: TgUserService, bot: Telegraf);
    handleNotifyNotFreeResources(): Promise<void>;
    handleEveryDayNotifyNotFreeResources(): Promise<void>;
}
