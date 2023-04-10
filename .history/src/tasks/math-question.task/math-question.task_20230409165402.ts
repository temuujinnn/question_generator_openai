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
    private subjects = [
        // ... (The provided subjects array)
    ];
    // Inside MathQuestionTask class
    private currentSubjectIndex = 0;
    private currentTopicIndex = 0;

    private rotateSubject(): string {
        this.currentSubjectIndex = (this.currentSubjectIndex + 1) % this.subjects.length;
        this.currentTopicIndex = 0; // Reset topic index when changing subject
        return this.subjects[this.currentSubjectIndex].name;
    }

    private rotateTopic(): string {
        const currentSubjectTopics = this.subjects[this.currentSubjectIndex].topics;
        this.currentTopicIndex = (this.currentTopicIndex + 1) % currentSubjectTopics.length;
        return currentSubjectTopics[this.currentTopicIndex];
    }

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
        const questions = await this.mathQuestionService.findAll();
        let isDuplicate = false;

        for (const question of questions) {
            if (await this.openaiService.isDuplicate(question.question, question.question)) {
                isDuplicate = true;
                console.log('Duplicate question found. Skipping...');
                break;
            }
        }

        const isCorrect = await this.openaiService.checkAnswer(question.question, question.answer.correctAnswer);

        if (!isDuplicate && isCorrect) {
            const mathQuestion = new MathQuestion(question);
            await this.mathQuestionService.create(question);
            this.logger.log(`Generated question: ${mathQuestion}`);
            this.logger.log(`Generated question: ${question.question}`);
            this.logger.log(`Job count: ${this.jobCount}`); // Log the job count
            this.logger.log('---------------------------------');
        } else {
            console.log('Question not saved due to duplicate or incorrect answer.');
        }
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
