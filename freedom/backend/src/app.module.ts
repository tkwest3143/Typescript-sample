import { Module } from '@nestjs/common';
import { ApiTestController } from './api-test/apiTestController';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,ApiTestController],
  providers: [AppService],
})
export class AppModule {}
