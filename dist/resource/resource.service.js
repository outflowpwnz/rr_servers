"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const tg_user_service_1 = require("../tg-user/tg-user.service");
const typeorm_1 = require("typeorm");
const resource_providers_1 = require("./resource.providers");
let ResourceService = class ResourceService {
    tgUserService;
    resourceRepository;
    constructor(tgUserService, resourceRepository) {
        this.tgUserService = tgUserService;
        this.resourceRepository = resourceRepository;
    }
    async getFreeResourceList(tgUserId) {
        try {
            const resources = await this.resourceRepository.find({
                where: { tgUser: { tgId: tgUserId }, isFree: true },
                relations: { tgUser: { role: true }, endMessage: true }
            });
            return resources;
        }
        catch (e) {
            console.log('getFreeResourceList', e.message);
            return [];
        }
    }
    async getUserTakenResourceList(tgUserId) {
        try {
            const resources = await this.resourceRepository.find({
                where: { tgUser: { tgId: tgUserId }, isFree: false },
                relations: { tgUser: { role: true }, endMessage: true }
            });
            return resources;
        }
        catch (e) {
            console.log('getUserTakenResourceList', e.message);
            return [];
        }
    }
    async getResourceList(tgUserId) {
        try {
            if (tgUserId) {
                const resources = await this.resourceRepository.find({
                    where: { tgUser: { tgId: tgUserId } },
                    relations: { tgUser: { role: true }, endMessage: true }
                });
                return resources;
            }
            const resources = await this.resourceRepository.find({ relations: { tgUser: { role: true }, endMessage: true } });
            return resources;
        }
        catch (e) {
            console.log('getResourceList', e.message);
            return [];
        }
    }
    async getResource(id) {
        try {
            const resource = await this.resourceRepository.findOne({
                where: { id },
                relations: { tgUser: { role: true }, endMessage: true }
            });
            if (!resource) {
                throw new Error('Такого ресурса нету :( или @olegthegoodboy накосячил');
            }
            return resource;
        }
        catch (e) {
            console.log('getResource', e.message);
            return null;
        }
    }
    async takeResource(id, userId) {
        try {
            const user = await this.tgUserService.getTgUser(userId);
            const resource = await this.resourceRepository.update({ id }, { tgUser: user, isFree: false });
            return resource;
        }
        catch (e) {
            console.log('takeResource', e.message);
            return null;
        }
    }
    async freeResource(id, userTgId) {
        try {
            const resource = await this.resourceRepository.findOne({
                where: { id, tgUser: { tgId: userTgId } },
                relations: { tgUser: { role: true }, endMessage: true }
            });
            if (resource) {
                resource.isFree = true;
                await this.resourceRepository.save(resource);
            }
            return resource;
        }
        catch (e) {
            console.log('freeResource', e.message);
            return null;
        }
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(resource_providers_1.RESOURCE_REPOSITORY)),
    __metadata("design:paramtypes", [tg_user_service_1.TgUserService,
        typeorm_1.Repository])
], ResourceService);
//# sourceMappingURL=resource.service.js.map