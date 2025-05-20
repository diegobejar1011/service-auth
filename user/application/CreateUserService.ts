import { UserReq } from "../domain/dtos";
import { DataRepository, EncryptRepository } from "../domain/repositories";

export class CreateUserService {
    constructor(
        private readonly dataRepository: DataRepository, 
        private readonly encryptRepository: EncryptRepository
    ) {}

    async run(userReq: UserReq) {
        try {

            const passwordEncrypt = await this.encryptRepository.encryptPassword(userReq.password);

            userReq = {
                ...userReq,
                password: passwordEncrypt
            };
            
            const userRes = await this.dataRepository.createUser(userReq);

            return userRes;

        } catch (error: any) {

            throw new Error(error.message);

        }
    }
}