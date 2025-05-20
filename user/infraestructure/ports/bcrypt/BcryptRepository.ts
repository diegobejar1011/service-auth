import { EncryptRepository } from "../../../domain/repositories";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class BcryptRepository implements EncryptRepository {

    async comparePassword(password: string, passwordEncrypt: string): Promise<boolean> {
        try {
            
            const validatedPassword = await bcrypt.compare(password, passwordEncrypt);

            return validatedPassword;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async encryptPassword(password: string): Promise<string> {
        try {
            
            const passwordEncrypt =  await bcrypt.hash(password, parseInt(process.env.NUMBER_SALTS!!) || 10);

            return passwordEncrypt;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}