import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CookieGuard } from './guard/cookie.guard';
import { ValidationExceptionFilter } from './filter/valid.filter';
import { UserModule } from './user/user.module';
import { LoggerModule } from './modules/logger.module';

@Module({
  imports: [UserModule, LoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: CookieGuard,
    },
    {
      provide: APP_PIPE, // 使用 APP_PIPE 符号
      useClass: ValidationPipe, // 使用 ValidationPipe 类
    },
  ],
})
export class AppModule {}
