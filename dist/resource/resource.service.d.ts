import { TgUserService } from 'src/tg-user/tg-user.service';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
export declare class ResourceService {
    private readonly tgUserService;
    private readonly resourceRepository;
    constructor(tgUserService: TgUserService, resourceRepository: Repository<Resource>);
    getFreeResourceList(tgUserId?: number): Promise<Resource[]>;
    getUserTakenResourceList(tgUserId?: number): Promise<Resource[]>;
    getResourceList(tgUserId?: number): Promise<Resource[]>;
    getResource(id: number): Promise<Resource | null>;
    takeResource(id: number, userId: number): Promise<import("typeorm").UpdateResult | null>;
    freeResource(id: number, userTgId: number): Promise<Resource | null>;
}
