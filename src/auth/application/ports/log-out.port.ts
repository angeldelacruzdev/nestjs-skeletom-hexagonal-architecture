export interface LogOutPort {
  logOut(userId: string): Promise<boolean>;
}
