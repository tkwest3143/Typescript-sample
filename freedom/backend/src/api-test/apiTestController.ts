import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller("api-test")
export class ApiTestController {
    
    @Get()
    getTasks() {
        return "getTasks Success!"
    }
    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string) {
        return `createTask Success! Prameter [title:${title}, descritpion:${description}]`
    }
}