import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { Session } from './auth/entities/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const sessionRepository = await app.get(DataSource).getRepository(Session);
  app.use(
    session({
      name: 'NEST_SESSION_ID',
      secret: 'sessionsSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore({cleanupLimit: 10}).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
