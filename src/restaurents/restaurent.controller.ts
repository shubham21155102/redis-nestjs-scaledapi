import { Controller, UseInterceptors } from '@nestjs/common';
import { RestaurentService } from './restaurent.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
@CacheTTL(30000)
@UseInterceptors(CacheInterceptor)
@Controller(`/api/v2`)
export class RestaurentController {
  constructor(private readonly appService: RestaurentService) {}
}
