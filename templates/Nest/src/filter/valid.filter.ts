// custom-validation.exception.ts

import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { BusinessException } from 'src/common/exception';
@Catch(HttpException)
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (
      exception instanceof HttpException &&
      exception.getStatus() === HttpStatus.BAD_REQUEST
    ) {
      const errors = exception.getResponse() as any;

      const res = new BusinessException(
        errors.message.join(),
        400,
        HttpStatus.BAD_REQUEST,
      ).getResponse();
      return response.status(HttpStatus.BAD_REQUEST).json(res);
    }

    super.catch(exception, host);
  }
}
