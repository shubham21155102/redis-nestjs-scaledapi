import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
@CacheTTL(30000)
@UseInterceptors(CacheInterceptor)
@Controller(`/api/v1`)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Get('health')
  getHealth() {
    return { status: 200, message: 'OK' };
  }
  @Get('clearall')
  clearCache() {
    try {
      this.appService.clearCache();
      return { message: 'Cache cleared successfully.' };
    } catch (error) {
      return { error: 'An error occurred while clearing the cache.' };
    }
  }
  @Get('getuser/:id')
  async findOne(@Param() params: any): Promise<string> {
    console.log(params.id);
    const idd = params.id;
    const result = await this.appService.getDataById(idd);
    return result;
  }
  @Get('search')
  async search(@Query('query') query: string): Promise<string> {
    console.log(query);
    const result = await this.appService.searchByTitle(query);
    return result;
  }
}
