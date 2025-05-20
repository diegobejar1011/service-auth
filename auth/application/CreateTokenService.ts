import { UserRes } from "../../user/domain/dtos";
import { AuthRepository } from "../domain/repositories/AuthRepositories";

export class CreateTokenService {
    constructor(private readonly authRepository: AuthRepository) {}


    run(user: UserRes) {
        try {
            
            const token = "Bearer " + this.authRepository.createToken(user);

            return token;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}