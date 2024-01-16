import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RestaurentService } from './restaurent.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
@CacheTTL(30000)
@UseInterceptors(CacheInterceptor)
@Controller(`/api/v2`)
export class RestaurentController {
  constructor(private readonly restaurentService: RestaurentService) {}
  @Get('allname')
  async getHealth() {
    const result = await this.restaurentService.getAllName();
    return result;
  }
}
