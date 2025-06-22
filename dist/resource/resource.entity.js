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
exports.Resource = void 0;
const message_entity_1 = require("../message/message.entity");
const tg_user_entity_1 = require("../tg-user/tg-user.entity");
const typeorm_1 = require("typeorm");
let Resource = class Resource {
    id;
    description;
    url;
    isFree;
    tgUser;
    endMessage;
    updatedAt;
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Resource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256 }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256 }),
    __metadata("design:type", String)
], Resource.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], Resource.prototype, "isFree", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tg_user_entity_1.TgUser, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Resource.prototype, "tgUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => message_entity_1.Message, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Resource.prototype, "endMessage", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resource.prototype, "updatedAt", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)()
], Resource);
//# sourceMappingURL=resource.entity.js.map