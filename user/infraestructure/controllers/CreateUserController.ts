import { Request, Response } from "express";
import { CreateUserService } from "../../application/CreateUserService";
import { UserReq } from "../../domain/dtos";

export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    async run(req: Request, res: Response) {
        try {
            
            const userReq: UserReq = req.body;

            const userRes = await this.createUserService.run(userReq);

            res.status(201).json({
                messagge: "Usuario creado correctamente!!",
                user: userRes
            });

        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    }
}