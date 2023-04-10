/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { MathQuestionTask } from './tasks/math-question.task/math-question.task';
import { MongooseModule } from '@nestjs/mongoose';
import { MathQuestionModule } from './math-question/math-question.module';
@Module({
  imports: [
    // ... existing imports ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://temvvk93:<password>@cluster0.51umr7b.mongodb.net/?retryWrites=true&w=majority'),
    MathQuestionModule, // Add your database name
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, MathQuestionTask], // Add OpenaiService here
})
export class AppModule { }
