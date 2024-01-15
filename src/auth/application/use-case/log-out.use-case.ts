import { LogOutPort } from '../ports';

export class LogOutUseCase {
  constructor(private logOutPort: LogOutPort) {}

  async logOut(userId: string): Promise<boolean> {
    return await this.logOutPort.logOut(userId);
  }
}
