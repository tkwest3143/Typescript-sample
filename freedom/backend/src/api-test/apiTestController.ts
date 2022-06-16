import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTestService } from './api-test.service';

@Controller('api-test')
export class ApiTestController {
  constructor(private readonly service: ApiTestService) {}
  @Get('getAllSettings')
  getAllSettings() {
    return this.service.getAllSetting();
  }
  @Post('save')
  save(
    @Body('title') title: string,
    @Body('url') url: string,
    @Body('method') method: string,
    @Body('parameters') parameters: { key: string; value: string }[],
  ) {
    const addSetting = this.service.registerSetting(
      title,
      url,
      method,
      parameters,
    );
    this.service.getSettingById(addSetting.id);
    return `createTask Success! Prameter [title:${title}, descritpion:${url}, method:${method}, parameters:${parameters}]`;
  }
  @Post('save/:id')
  saveById(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('url') url: string,
    @Body('method') method: string,
    @Body('parameters') parameters: { key: string; value: string }[],
  ) {
    this.service.updateSetting({
      id,
      title,
      url,
      method,
      parameters,
    });
    return `createTask Success! Prameter [title:${title}, descritpion:${url}, method:${method}, parameters:${parameters}]`;
  }
}
