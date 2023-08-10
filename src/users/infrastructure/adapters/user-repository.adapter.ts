import { UserRepositoryPort } from "src/users/application";


export class UserRepositoryAdapter implements UserRepositoryPort {
    findUserByid(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    saveUser(user: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

}