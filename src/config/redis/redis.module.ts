import { DynamicModule, Module } from "@nestjs/common";
import Redis from "ioredis";

interface RedisOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}


@Module({})
export class RedisModule {

  static forRoot(
    options: RedisOptions
  ): DynamicModule {
    return {
      module: RedisModule,
      providers: [{
        provide: Redis,
        useFactory: () => new Redis(options)
      }],
      exports: [Redis]
    };
    
  }

}