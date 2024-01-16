import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Param } from '@nestjs/common';
import fetch from 'node-fetch';
import { Cache } from 'cache-manager';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  async getHello(): Promise<string> {
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
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const data = await res.json();
        const jsonDataToString = JSON.stringify(data);
        await this.cacheManager.set('todos', jsonDataToString);
        resolve(data);
      } catch (e) {
        resolve(JSON.stringify(e));
      }
    });
  }
  async clearCache(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      try {
        await this.cacheManager.reset();
        resolve('Cache cleared successfully.');
      } catch (error) {
        resolve('An error occurred while clearing the cache.');
      }
    });
  }
  async getDataById(id: string): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const cachedTodos = await this.cacheManager.get(id);
      const x = JSON.stringify(cachedTodos);
      if (cachedTodos) {
        console.log(`CacheHit`);
        resolve(JSON.parse(x));
        return;
      }
      try {
        console.log(`ApiCall`);
        console.log(id);
        const link = `https://jsonplaceholder.typicode.com/todos/${id}`;
        console.log(link);
        const res = await fetch(link);
        const data = await res.json();
        console.log(data);
        const jsonDataToString = JSON.stringify(data);
        await this.cacheManager.set(id, jsonDataToString);
        resolve(data);
      } catch (e) {
        resolve(JSON.stringify(e));
      }
    });
  }
  async checkParams(id: string): Promise<string> {
    return new Promise<string>(async (resolve) => {
      console.log(Param(id));
      resolve(JSON.stringify(Param(id)));
    });
  }
  async searchByTitle(title: string): Promise<string> {
    console.log(title);
    return new Promise<string>(async (resolve) => {
      const cachedTodos = await this.cacheManager.get(title);
      const x = JSON.stringify(cachedTodos);
      if (cachedTodos) {
        console.log(`CacheHit`);
        resolve(JSON.parse(x));
        return;
      }
      try {
        console.log(`ApiCall`);
        console.log(title);
        const link = `https://jsonplaceholder.typicode.com/todos?title=${title}`;
        console.log(link);
        const res = await fetch(link);
        const data = await res.json();
        console.log(data);
        const jsonDataToString = JSON.stringify(data);
        await this.cacheManager.set(title, jsonDataToString);
        resolve(data);
      } catch (e) {
        resolve(JSON.stringify(e));
      }
    });
  }
}
