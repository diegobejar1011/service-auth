"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenService = void 0;
class CreateTokenService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    run(user) {
        try {
            const token = "Bearer " + this.authRepository.createToken(user);
            return token;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.CreateTokenService = CreateTokenService;
