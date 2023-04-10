import { Module } from '@nestjs/common';
import { MathQuestionService } from './math-question.service';

@Module({
  providers: [MathQuestionService]
})
export class MathQuestionModule {}
