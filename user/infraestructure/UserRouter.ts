import { Router } from "express";

import { loginController, createUserController } from "./UserDependencies";

export const userRouter = Router();

userRouter.post("/login", loginController.run.bind(loginController));
userRouter.post("/", createUserController.run.bind(createUserController));