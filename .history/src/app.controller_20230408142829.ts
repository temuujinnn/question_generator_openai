import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller()
export class AppController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('generate-question')
  async generateMathQuestion(): Promise<string> {
    return await this.openaiService.generateMathQuestion();
  }
}