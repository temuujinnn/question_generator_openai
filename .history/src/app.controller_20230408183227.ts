import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { MathQuestion } from './math-question/math-question.schema';

@Controller()
export class AppController {
  mathQuestionService: any;
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly mathQuestionTask: MathQuestionTask,
    private readonly mathQuestionService: MathQuestionService,
  ) { }

  @Get('generate-question')
  async generateMathQuestion(): Promise<string> {
    return await this.openaiService.generateMathQuestion();
  }
  @Get('questions')
  async getAllQuestions(): Promise<MathQuestion[]> {
    return this.mathQuestionService.findAll();
  }
}
