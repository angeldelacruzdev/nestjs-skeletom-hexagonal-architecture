import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AuthNotFoundException } from './auth/auth-exceptions';
import { UserBadRequestException } from './users/user-exception';

@Catch(AuthNotFoundException, UserBadRequestException)
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = (exception as any).statusCode || 500; // Usa el código de estado proporcionado o el predeterminado

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
