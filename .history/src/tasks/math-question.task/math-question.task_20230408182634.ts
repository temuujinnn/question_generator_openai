import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenaiService } from '../openai.service';
import { MathQuestionService } from '../math-question/math-question.service';

@Injectable()
export class MathQuestionTask {
    private readonly logger = new Logger(MathQuestionTask.name);
    private jobCount = 0;

    constructor(
        private readonly openaiService: OpenaiService,
        private readonly mathQuestionService: MathQuestionService, // Inject MathQuestionService
    ) { }

    @Cron('*/2 * * * *')
    async handleCron() {
        this.jobCount++;
        this.logger.log('Generating math question every 2 minutes');
        const generatedQuestion = await this.openaiService.generateMathQuestion