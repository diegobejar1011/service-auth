import { UserRes } from "../../../user/domain/dtos";
import { SECRET_KEY } from "../../domain/constants/SECRET_KEY";
import { AuthRepository } from "../../domain/repositories/AuthRepositories";
import jwt from "jsonwebtoken";

export class JwtRepository implements AuthRepository {

    createToken(user: UserRes): string {
        try {
            
            const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h"});

            return token;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
}