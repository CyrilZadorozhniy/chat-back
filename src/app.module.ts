import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DOCKER_CONTAINER_NAME: Joi.string().required(),
        DOCKER_DATABASE_PORT: Joi.number().port().required(),
        DOCKER_POSTGRES_DB: Joi.string().required(),
        DOCKER_POSTGRES_USER: Joi.string().required(),
        DOCKER_POSTGRES_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DOCKER_POSTGRES_USER,
      password: process.env.DOCKER_POSTGRES_PASSWORD,
      database: process.env.DOCKER_POSTGRES_DB,
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
