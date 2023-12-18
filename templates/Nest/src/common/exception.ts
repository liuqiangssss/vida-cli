// custom-error.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, code: number, statusCode: HttpStatus = 200) {
    super({ code, message }, statusCode);
  }
}
