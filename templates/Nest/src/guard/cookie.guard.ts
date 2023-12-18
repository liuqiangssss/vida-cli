import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { errorType } from 'src/common/errorType';

const whiteList: string[] = ['auth'];

@Injectable()
export class CookieGuard implements CanActivate {
  // constructor(private readonly sessionService: SessionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (whiteList.findIndex((item) => request.url.includes(item)) !== -1) {
      return true;
    }
    try {
      const sessionId = request.cookies['sessionId'];
      if (!sessionId) {
       // Throw an error if the cookie is not found
      }
      return true; // 放行
    } catch (error) {
      throw error;
    }
  }
}
