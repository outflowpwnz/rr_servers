import { TContext } from './bot.types';
import { ResourceService } from 'src/resource/resource.service';
import { BotHelpers } from './bot.helpers';
export declare class BotUpdate {
    private readonly resourceService;
    private readonly botHelpers;
    constructor(resourceService: ResourceService, botHelpers: BotHelpers);
    onStart(ctx: TContext): Promise<void>;
    onHelp(ctx: TContext): Promise<void>;
    onList(ctx: TContext): Promise<void>;
    onCheckId(ctx: TContext): Promise<void>;
    onBusyList(ctx: TContext): Promise<void>;
    onTakeServerClick(ctx: TContext): Promise<void>;
    onFreeServerClick(ctx: TContext): Promise<void>;
    onDisabledServerClick(ctx: TContext): Promise<import("@telegraf/types").Message.TextMessage | undefined>;
}
