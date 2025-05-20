import { Request, Response } from "express";
import { LoginService } from "../../application/LoginService";

export class LoginController {
    constructor(private readonly loginService: LoginService) {}
    
    async run(req: Request, res: Response) {
        try {

            const userReq = req.body;

            
            
            const token = await this.loginService.run(userReq);

            res.status(200).json(token);

        } catch (error: any) {

            console.log(error);
            
            res.status(500).json({
                message: error.message
            });

        }
    }
}