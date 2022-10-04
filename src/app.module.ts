import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/\bboard/board.module';
import { AuthModule } from './apis/Auth/auth.module';
import { BoardDetailModule } from './apis/board_detail/board_detail.module';
import { HomeModule } from './apis/home/home.module';
import { IntroduceModule } from './apis/introduce/introduce.module';
import { ShootingModule } from './apis/shooting/shooting.module';
import { UpdateModule } from './apis/update/update.module';
import { UserModule } from './apis/user/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UpdateModule,
    BoardDetailModule,
    BoardModule,
    IntroduceModule,
    HomeModule,
    ShootingModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.5.17.4',
      // host: 'localhost',

      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mvc01',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://10.5.16.3:6379',
      // url: 'redis://my-redis:6379',

      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
