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
exports.LoginController = void 0;
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userReq = req.body;
                const token = yield this.loginService.run(userReq);
                res.status(200).json(token);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        });
    }
}
exports.LoginController = LoginController;
