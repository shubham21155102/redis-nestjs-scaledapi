import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Cache } from 'cache-manager';
@Injectable()
export class RestaurentService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  async getAllName(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const cachedTodos = await this.cacheManager.get('todos');
      const x = JSON.stringify(cachedTodos);
      if (cachedTodos) {
        console.log(`CacheHit`);
        resolve(JSON.parse(x));
        return;
      }
      try {
        console.log(`ApiCall`);
        const res = await fetch(`http://localhost:8000/`);
        const data = await res.json();
        const jsonDataToString = JSON.stringify(data);
        await this.cacheManager.set('todos', jsonDataToString);
        resolve(data);
      } catch (e) {
        resolve(JSON.stringify(e));
      }
    });
  }
}
