"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FindUserUseCase", {
    enumerable: true,
    get: function() {
        return FindUserUseCase;
    }
});
let FindUserUseCase = class FindUserUseCase {
    async execute(id) {
        return await this.userRepository.findUserByid(id);
    }
    constructor(userRepository){
        this.userRepository = userRepository;
    }
};
