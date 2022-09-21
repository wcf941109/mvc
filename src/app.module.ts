import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/\bboard/board.module';
import { AuthModule } from './apis/Auth/auth.module';
import { BoardDetailModule } from './apis/board_detail/board_detail.module';
import { HomeModule } from './apis/home/home.module';
import { IntroduceModule } from './apis/introduce/introduce.module';
import { ShootingModule } from './apis/shooting/shooting.module';
import { UpdateModule } from './apis/update/update.module';
import { User } from './apis/user/entities/user.entity';
import { UserModule } from './apis/user/user.module';
import * as redisStore from 'cache-manager';
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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mvc',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://localhost:3000',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
