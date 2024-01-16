import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { RestaurentController } from './restaurents/restaurent.controller';
import { RestaurentService } from './restaurents/restaurent.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 30000,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController, RestaurentController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    RestaurentService,
  ],
})
export class AppModule {}
