import { UserReq, UserRes } from "../dtos";
import { UserI } from "../entities/UserI";

export interface DataRepository {
    createUser(userReq: UserReq): Promise<UserRes>;
    getUserByEmail(email: string): Promise<UserI>;
}