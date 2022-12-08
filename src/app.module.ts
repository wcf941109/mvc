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
import { AppService } from './app.service';
import { AppController } from './app.controller';

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
      host: '10.114.131.4',
      // host: 'my_database',
      port: 3306,
      username: 'root',
      password: 'root',
      // password: '12341234', //local
      database: 'mvc01',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://10.1.65.3:6379',
      // url: 'redis://my-redis:6379',

      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
