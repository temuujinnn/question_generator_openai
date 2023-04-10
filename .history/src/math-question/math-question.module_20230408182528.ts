/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MathQuestion, MathQuestionSchema } from './math-question.schema';
import { MathQuestionService } from './math-question.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MathQuestion.name, schema: MathQuestionSchema }]),
  ],
  providers: [MathQuestionService],
  exports: [MathQuestionService],
})
export class MathQuestionModule { }
