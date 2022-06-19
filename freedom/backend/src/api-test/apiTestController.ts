import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTestService } from './api-test.service';
import { SaveForm } from './form/save-form';

@Controller('api-test')
export class ApiTestController {
  constructor(private readonly service: ApiTestService) {}
  @Get('getAllSettings')
  getAllSettings() {
    return { data: this.service.getAllSetting() };
  }
  @Post('save')
  save(@Body() saveForm: SaveForm) {
    const addSetting = this.service.registerSetting(
      saveForm.title,
      saveForm.url,
      saveForm.method,
      saveForm.parameters,
    );
    this.service.getSettingById(addSetting.id);
    return `createTask Success! Prameter [title:${saveForm.title}, descritpion:${saveForm.url}, method:${saveForm.method}, parameters:${saveForm.parameters}]`;
  }
  @Post('update')
  saveById(
    @Body('id') id: number,
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
