export class SomeCustomException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SomeCustomException';
  }
}
