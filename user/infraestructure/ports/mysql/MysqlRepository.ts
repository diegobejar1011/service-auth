import { db } from "../../../../core/data/mysql/application/conn";
import { UserReq, UserRes } from "../../../domain/dtos";
import { UserI } from "../../../domain/entities/UserI";
import { DataRepository } from "../../../domain/repositories";

export class MysqlRepository implements DataRepository {

    async createUser(userReq: UserReq): Promise<UserRes> {
        try {

            const query = "INSERT INTO users (email, password) VALUES (?,?)";

            const { email, password } = userReq;

            const userSaved: any = await db.execute(query, [email, password]);

            return {
                id: userSaved[0].insertId
            }
            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email: string): Promise<UserI> {
        try {

            const query = "SELECT id, email, password FROM users WHERE email = ?";

            const user: any = await db.execute(query, [email]);

            return user[0][0];

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}