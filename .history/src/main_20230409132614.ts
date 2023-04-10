/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  dotenv.config();

}
console.log(process.env.OPENAI_API_KEY);
bootstrap();
