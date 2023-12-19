import { Global, Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Logger',
      useFactory: () => new Logger(),
    },
  ],
  exports: ['Logger'], // 确保将其导出
})
export class LoggerModule {}
