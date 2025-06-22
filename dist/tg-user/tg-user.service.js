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
exports.TgUserService = void 0;
const common_1 = require("@nestjs/common");
const tg_user_providers_1 = require("./tg-user.providers");
const typeorm_1 = require("typeorm");
let TgUserService = class TgUserService {
    tgUserRepository;
    constructor(tgUserRepository) {
        this.tgUserRepository = tgUserRepository;
    }
    async getTgUser(tgUserId) {
        try {
            if (tgUserId) {
                const user = await this.tgUserRepository.findOne({ where: { tgId: tgUserId } });
                return user;
            }
            return null;
        }
        catch (e) {
            console.error('getTgUsers', e.message);
            return null;
        }
    }
    async getTgUsers() {
        try {
            return await this.tgUserRepository.find();
        }
        catch (e) {
            console.error('getTgUsers', e.message);
            return [];
        }
    }
};
exports.TgUserService = TgUserService;
exports.TgUserService = TgUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tg_user_providers_1.TG_USER_REPOSITORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TgUserService);
//# sourceMappingURL=tg-user.service.js.map