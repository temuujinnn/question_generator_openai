/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { MathQuestionTask } from './tasks/math-question.task/math-question.task';

@Module({
  imports: [
    // ... existing imports
    MongooseModule.forRoot('mongodb://localhost:27017/your_database_name'), // Add your database name
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, MathQuestionTask], // Add OpenaiService here
})
export class AppModule { }
