"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserDependencies_1 = require("./UserDependencies");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", UserDependencies_1.loginController.run.bind(UserDependencies_1.loginController));
exports.userRouter.post("/", UserDependencies_1.createUserController.run.bind(UserDependencies_1.createUserController));
