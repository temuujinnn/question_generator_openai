import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly openaiService: OpenaiService) { }

  @Get('generate-question')
  async generateMathQuestion(): Promise<string> {
    return await this.openaiService.generateMathQuestion();
  }
}
