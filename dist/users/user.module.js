"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserModule", {
    enumerable: true,
    get: function() {
        return UserModule;
    }
});
const _common = require("@nestjs/common");
const _infrastructure = require("./infrastructure/index");
const _application = require("./application/index");
const _usercontroller = require("./http-server/user.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserModule = class UserModule {
};
UserModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            {
                provide: _application.USER_REPOSITORY_PORT,
                useClass: _infrastructure.UserRepositoryAdapter
            },
            {
                provide: _application.FindUserUseCase,
                useFactory: (userRepository)=>new _application.FindUserUseCase(userRepository),
                inject: [
                    _application.USER_REPOSITORY_PORT
                ]
            }
        ],
        controllers: [
            _usercontroller.UserController
        ]
    })
], UserModule);
