import { CreateTokenService } from "../../auth/application/CreateTokenService";
import { UserReq } from "../domain/dtos";
import { DataRepository, EncryptRepository } from "../domain/repositories";

export class LoginService {
    constructor(
        private readonly dataRepository: DataRepository,
        private readonly encryptRepository: EncryptRepository,
        private readonly createTokenService: CreateTokenService
    ) {}

    async run(userReq: UserReq) {
        try {
            
            const userSaved = await this.dataRepository.getUserByEmail(userReq.email);

            if(!userSaved) throw new Error("Usuario no encontrado");

            const comparePassword = this.encryptRepository.comparePassword(userReq.email, userSaved.password);

            if(!comparePassword) throw new Error("Contraseña incorrecta");

            const token = this.createTokenService.run({ id: 0});

            return token;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}