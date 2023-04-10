/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenaiService } from 'src/openai/openai.service';


@Injectable()
export class MathQuestionTask {
    private readonly logger = new Logger(MathQuestionTask.name);
    private jobCount = 0;
    mathQuestionService: any;

    constructor(private readonly openaiService: OpenaiService) { }

    @Cron('*/2 * * * *') // Update the cron expression for every 2 minutes
    async handleCron() {
        this.jobCount++;
        console.log('Generating math question every 2 minutes');
        this.logger.debug('Generating math question every 2 minutes');
        const question = await this.openaiService.generateMathQuestion();
        // const savedQuestion = await this.mathQuestionService.create(question);
        // this.logger.log(savedQuestion);
        this.logger.log(`Generated question: ${question}`);
        this.logger.log(`Job count: ${this.jobCount}`); // Log the job count
    }
}
