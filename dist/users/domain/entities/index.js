// src/users/domain/entities/user.entity.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserEntity", {
    enumerable: true,
    get: function() {
        return UserEntity;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserEntity = class UserEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        length: 50
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        length: 100
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        length: 100
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        length: 100
    }),
    _ts_metadata("design:type", String)
], UserEntity.prototype, "rt_hash", void 0);
UserEntity = _ts_decorate([
    (0, _typeorm.Entity)('users')
], UserEntity);
