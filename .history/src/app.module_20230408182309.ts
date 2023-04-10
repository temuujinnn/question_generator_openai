/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { MathQuestionTask } from './tasks/math-question.task/math-question.task';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    // ... existing imports ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongosh "mongodb+srv://cluster0.51umr7b.mongodb.net/myFirstDatabase" --apiVersion 1 --username temvvk93'), // Add your database name
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, MathQuestionTask], // Add OpenaiService here
})
export class AppModule { }
