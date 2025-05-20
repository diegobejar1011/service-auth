"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
class LoginService {
    constructor(dataRepository, encryptRepository, createTokenService) {
        this.dataRepository = dataRepository;
        this.encryptRepository = encryptRepository;
        this.createTokenService = createTokenService;
    }
    run(userReq) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSaved = yield this.dataRepository.getUserByEmail(userReq.email);
                if (!userSaved)
                    throw new Error("Usuario no encontrado");
                const comparePassword = this.encryptRepository.comparePassword(userReq.email, userSaved.password);
                if (!comparePassword)
                    throw new Error("Contraseña incorrecta");
                const token = this.createTokenService.run({ id: 0 });
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.LoginService = LoginService;
