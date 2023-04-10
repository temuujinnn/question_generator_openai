/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { MathQuestion } from './math-question/math-question.schema';
import { MathQuestionService } from './math-question/math-question.service';
import { MathQuestionTask } from './tasks/math-question.task/math-question.task';

@Controller()
export class AppController {


  constructor(
    private readonly openaiService: OpenaiService,
    private readonly mathQuestionTask: MathQuestionTask,
    private readonly mathQuestionService: MathQuestionService,
  ) { }
  // eslint-disable-next-line prettier/prettier


  // @Get('generate-question')
  // async generateMathQuestion(): Promise<string> {
  //   return await this.openaiService.generateMathQuestion();
  // }
  @Get('questions')
  async getAllQuestions(): Promise<MathQuestion[]> {
    return this.mathQuestionService.findAll();
  }
  @Get('trigger-cron')
  async triggerCron(): Promise<string> {
    await this.mathQuestionTask.handleCron(); // Call the handleCron method
    return 'Cron job triggered';
  }
}
