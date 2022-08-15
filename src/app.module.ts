import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/\bboard/board.module';
import { HomeModule } from './apis/home/home.module';
import { IntroduceModule } from './apis/introduce/introduce.module';
import { LoginModule } from './apis/login/login.module';
import { ShootingModule } from './apis/shooting/shooting.module';

@Module({
  imports: [
    BoardModule,
    IntroduceModule,
    LoginModule,
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
  ],
})
export class AppModule {}
