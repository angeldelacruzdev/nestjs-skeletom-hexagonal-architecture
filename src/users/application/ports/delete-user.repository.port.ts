export interface DeleteUserRepositoryPort {
    delete(id: number, status: boolean): Promise<boolean>;
}