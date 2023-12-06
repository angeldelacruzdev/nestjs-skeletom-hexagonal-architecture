export class HttpException extends Error {
  constructor(name: string, message: string, stack?: string) {
    super(message);

    this.name = name;

    if (stack) {
      this.stack = stack;
    }
  }
}
