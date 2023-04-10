/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MathQuestion } from 'src/math-question/math-question.schema';
import { MathQuestionService } from 'src/math-question/math-question.service';
import { OpenaiService } from 'src/openai/openai.service';


@Injectable()
export class MathQuestionTask {
    private readonly logger = new Logger(MathQuestionTask.name);

    constructor(private readonly mathQuestionService: MathQuestionService, private readonly openaiService: OpenaiService) { }

    @Cron('*/2 * * * *')
    async generateAndSaveMathQuestion(): Promise<void> {
        const generatedQuestion = await this.openaiService.generateMathQuestion();
        this.logger.debug(`Generated question: ${generatedQuestion.question}`);


        await this.mathQuestionService.create(mathQuestion);

        this.logger.debug(`Saved question: ${JSON.stringify(mathQuestion)}`);
    }
}