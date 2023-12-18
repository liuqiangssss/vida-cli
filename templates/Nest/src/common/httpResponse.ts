// common/http-response.ts

import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export class HttpResponse {
  static success<T>(data = null, message = 'ok'): ApiResponse<T> {
    return {
      code: 0,
      message,
      data,
    };
  }

  static error<T>({
    message,
    code = HttpStatus.INTERNAL_SERVER_ERROR,
  }: ApiResponse<T>): ApiResponse<T> {
    return {
      code,
      message,
    };
  }
}
