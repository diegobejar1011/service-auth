"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenService = void 0;
const CreateTokenService_1 = require("../application/CreateTokenService");
const JwtRepository_1 = require("./ports/JwtRepository");
const jwtRepository = new JwtRepository_1.JwtRepository();
exports.createTokenService = new CreateTokenService_1.CreateTokenService(jwtRepository);
