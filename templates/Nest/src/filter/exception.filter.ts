import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/common/httpResponse';
import { BusinessException } from 'src/common/exception';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse() as ApiResponse<any>;
    response.status(status).json({
      code: res.code,
      message: res.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
