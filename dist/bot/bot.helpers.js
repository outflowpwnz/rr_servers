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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotHelpers = void 0;
const common_1 = require("@nestjs/common");
const tg_user_service_1 = require("../tg-user/tg-user.service");
const bot_types_1 = require("./bot.types");
let BotHelpers = class BotHelpers {
    tgUserService;
    constructor(tgUserService) {
        this.tgUserService = tgUserService;
    }
    getResourceId(ctx) {
        const resourceId = ctx.match ? Number(ctx.match[1]) : null;
        return resourceId;
    }
    async assertUserExists(ctx) {
        try {
            const user = await this.tgUserService.getTgUser(ctx.from?.id);
            if (!user) {
                await ctx.reply(`🚫 Вы не зарегистрированы -> /${bot_types_1.COMMANDS.CHECK_ID}`);
                return false;
            }
            return true;
        }
        catch (e) {
            await ctx.reply(e.message);
            return false;
        }
    }
};
exports.BotHelpers = BotHelpers;
exports.BotHelpers = BotHelpers = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tg_user_service_1.TgUserService])
], BotHelpers);
//# sourceMappingURL=bot.helpers.js.map