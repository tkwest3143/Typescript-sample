import { Module } from '@nestjs/common';
import { ApiTestController } from './api-test/apiTestController';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiTestService } from './api-test/api-test.service';
import { ApiTestModule } from './api-test/api-test.module';

@Module({
  imports: [ApiTestModule],
  controllers: [AppController, ApiTestController],
  providers: [AppService, ApiTestService],
})
export class AppModule {}
