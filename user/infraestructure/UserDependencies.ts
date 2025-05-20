import { MysqlRepository } from "./ports/mysql/MysqlRepository";
import { BcryptRepository } from "./ports/bcrypt/BcryptRepository";

import { CreateUserService } from "../application/CreateUserService";
import { LoginService } from "../application/LoginService";

import { CreateUserController } from "./controllers/CreateUserController";
import { LoginController } from "./controllers/LoginController";

import { createTokenService } from "../../auth/infraestructure/AuthDependencies";

const mysqlRepository = new MysqlRepository();
const bcryptRepository = new BcryptRepository();

const createUserService = new CreateUserService(mysqlRepository, bcryptRepository);
const loginService = new LoginService(mysqlRepository, bcryptRepository, createTokenService);

export const createUserController = new CreateUserController(createUserService);
export const loginController = new LoginController(loginService);