import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllexceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllexceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse();
    const request = context.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.log(
      `HtppStatus: ${status} Erro Message: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      timestamp: new Date().toISOString,
      path: request.path,
      error: message,
    });
  }
}
