export interface UserRepositoryPort {
    findUserByid(id: string): Promise<any>
    saveUser(user: any): Promise<any>
}