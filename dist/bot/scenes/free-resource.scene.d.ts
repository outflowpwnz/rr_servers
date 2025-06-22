import { TContext } from '../bot.types';
import { ResourceService } from 'src/resource/resource.service';
export declare class FreeResource {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    onSceneEnter(ctx: TContext): Promise<void>;
    onFreeCommand(ctx: TContext): Promise<void>;
    onLeaveCommand(ctx: TContext): Promise<void>;
}
