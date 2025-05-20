import { CreateTokenService } from "../application/CreateTokenService";

import { JwtRepository } from "./ports/JwtRepository";

const jwtRepository = new JwtRepository();

export const createTokenService = new CreateTokenService(jwtRepository);

