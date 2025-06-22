import { TContext } from '../bot.types';
import { ResourceService } from 'src/resource/resource.service';
export declare class TakeResource {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    onSceneEnter(ctx: TContext): Promise<any>;
    onTakeCommand(ctx: TContext): Promise<void>;
    onLeaveCommand(ctx: TContext): Promise<void>;
}
