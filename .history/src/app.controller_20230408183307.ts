import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { MathQuestion } from './math-question/math-question.schema';
import { MathQuestionService } from './math-question/math-question.service';
import { MathQuestionTask } from './tasks/math-question.task/math-question.task';

@Controller()
export class AppController {
  mathQuestionService: any;
  getHello(): any {
    throw new Error('Method not implemented.');
    constructor(
      private readonly openaiService: OpenaiService,
      private readonly mathQuestionTask: MathQuestionTask,
      private readonly mathQuestionService: MathQuestionService,
    ) { }
  }
  // eslint-disable-next-line prettier/prettier


  @Get('generate-question')
  async generateMathQuestion(): Promise<string> {
    return await this.openaiService.generateMathQuestion();
  }
  @Get('questions')
  async getAllQuestions(): Promise<MathQuestion[]> {
    return this.mathQuestionService.findAll();
  }
}
