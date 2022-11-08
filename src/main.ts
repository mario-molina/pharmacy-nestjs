import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // It allows to application to use validation decorators
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // It allows class-validator to use NestJS dependency injection container
  await app.listen(process.env.APP_PORT);
}
bootstrap();
