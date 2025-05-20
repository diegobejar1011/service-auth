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
exports.MysqlRepository = void 0;
const conn_1 = require("../../../../core/data/mysql/application/conn");
class MysqlRepository {
    createUser(userReq) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO users (email, password) VALUES (?,?)";
                const { email, password } = userReq;
                const userSaved = yield conn_1.db.execute(query, [email, password]);
                return {
                    id: userSaved[0].insertId
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT id, email, password FROM users WHERE email = ?";
                const user = yield conn_1.db.execute(query, [email]);
                return user[0][0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.MysqlRepository = MysqlRepository;
