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
exports.Message = void 0;
const resource_entity_1 = require("../resource/resource.entity");
const typeorm_1 = require("typeorm");
let Message = class Message {
    id;
    text;
    resources;
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 512 }),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_entity_1.Resource, (resource) => resource.endMessage, { cascade: true }),
    __metadata("design:type", Array)
], Message.prototype, "resources", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
//# sourceMappingURL=message.entity.js.map