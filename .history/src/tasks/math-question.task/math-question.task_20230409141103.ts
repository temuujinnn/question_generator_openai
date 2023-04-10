/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MathQuestionService } from 'src/math-question/math-question.service';
import { OpenaiService } from 'src/openai/openai.service';


@Injectable()
export class MathQuestionTask {
    handleCron() {
        throw new Error('Method not implemented.');
    }
    private readonly logger = new Logger(MathQuestionTask.name);

    constructor(private readonly mathQuestionService: MathQuestionService, private readonly openaiService: OpenaiService) { }

    @Cron('*/2 * * * *')
    async generateAndSaveMathQuestion(): Promise<void> {
        const lessonTopic = 'Geometry'; // Replace with your own lesson topic

        const generatedQuestion = await this.openaiService.generateMathQuestion(lessonTopic);
        this.logger.debug(`Generated question: ${generatedQuestion.question}`);

        const mathQuestion = new MathQuestion(generatedQuestion);
        await this.mathQuestionService.create(mathQuestion);

        this.logger.debug(`Saved question: ${JSON.stringify(mathQuestion)}`);
    }
}
