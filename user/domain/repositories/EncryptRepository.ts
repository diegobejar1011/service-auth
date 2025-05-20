export interface EncryptRepository {
    comparePassword(password: string, passwordEncrypt: string): Promise<boolean>;
    encryptPassword(password: string): Promise<string>;
}