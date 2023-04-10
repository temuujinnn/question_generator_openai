import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MathQuestion } from './schemas/math-question.schema';
import { MathQuestionService } from './math-question.service';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class MathQuestionTask {
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
