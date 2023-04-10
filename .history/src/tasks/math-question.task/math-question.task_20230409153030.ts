/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MathQuestion } from 'src/math-question/math-question.schema';
import { MathQuestionService } from 'src/math-question/math-question.service';
import { OpenaiService } from 'src/openai/openai.service';


@Injectable()
export class MathQuestionTask {
    private readonly logger = new Logger(MathQuestionTask.name);
    private jobCount = 0;


    constructor(
        private readonly openaiService: OpenaiService,
        private readonly mathQuestionService: MathQuestionService
    ) { }
    @Cron('*/1 * * * *') // Update the cron expression for every 2 minutes
    async handleCron() {

        this.jobCount++;
        console.log('Generating math question every 2 minutes');
        this.logger.debug('Generating math question every 2 minutes');
        const question = await this.openaiService.generateMathQuestion();
        await this.mathQuestionService.create(question);
        this.logger.log(`Generated question: ${JSON.stringify(question)}`);
        // this.logger.log(savedQuestion);

        this.logger.log(`Job count: ${this.jobCount}`); // Log the job count
        this.logger.log('---------------------------------');
    }
    // Inside MathQuestionTask class
    // Inside MathQuestionTask class
    async cleanDatabase() {
        const questions = await this.mathQuestionService.findAll();

        // Using a Set to store unique question IDs
        const uniqueQuestionIds = new Set<string>();

        for (const question1 of questions) {
            if (uniqueQuestionIds.has(question1._id)) {
                // Skip this question if it's already marked as unique
                continue;
            }

            // Add this question to the unique question IDs set
            uniqueQuestionIds.add(question1._id);

            for (const question2 of questions) {
                if (question1._id === question2._id) {
                    // Skip the same question
                    continue;
                }

                const duplicate = await this.openaiService.isDuplicate(
                    question1.question,
                    question2.question,
                );

                if (duplicate) {
                    await this.mathQuestionService.deleteById(question2._id);
                    console.log(`Deleted duplicate question: ${question2.question}`);
                } else {
                    // Check if the answer is wrong
                    const isCorrect = await this.openaiService.checkAnswer(
                        question2.question,
                        question2.answer.correctAnswer,
                    );

                    if (!isCorrect) {
                        await this.mathQuestionService.deleteById(question2._id);
                        console.log(`Deleted question with wrong answer: ${question2.question}`);
                    } else {
                        // Add this question to the unique question IDs set
                        uniqueQuestionIds.add(question2._id);
                    }
                }
            }
        }
    }


}
