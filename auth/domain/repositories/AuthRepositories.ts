import { UserRes } from "../../../user/domain/dtos";

export interface AuthRepository {
    createToken(userId: UserRes): string;
}