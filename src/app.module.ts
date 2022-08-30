import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/\bboard/board.module';
import { BoardDetailModule } from './apis/board_detail/board_detail.module';
import { HomeModule } from './apis/home/home.module';
import { IntroduceModule } from './apis/introduce/introduce.module';
import { ShootingModule } from './apis/shooting/shooting.module';
import { UpdateModule } from './apis/update/update.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
