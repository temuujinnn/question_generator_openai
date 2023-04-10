import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenaiService } from '../openai.service';

@Injectable()
export class MathQuestionTask {
    private readonly logger = new Logger(MathQuestionTask.name);

    constructor(private readonly openaiService: OpenaiService) { }

    @Cron('0 */2 * * *')
    async handleCron() {
        this.logger.debug('Generating math question every 2 hours');
        const question = await this.openaiService.generateMathQuestion();
        this.logger.log(`Generated question: ${question}`);
    }
}
