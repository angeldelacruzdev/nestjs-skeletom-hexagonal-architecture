export interface ExceptionHandlerPort {
  handle(exception: Error): any;
}
