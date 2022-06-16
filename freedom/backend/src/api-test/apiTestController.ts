import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api-test')
export class ApiTestController {
  @Get()
  getTasks() {
    return 'getTasks Success!';
  }
  @Post('save')
  save(
    @Body('title') title: string,
    @Body('url') url: string,
    @Body('method') method: string,
    @Body('parameters') parameters: { key: string; value: string }[],
  ) {
    return `createTask Success! Prameter [title:${title}, descritpion:${url}, method:${method}, parameters:${parameters}]`;
  }
}
