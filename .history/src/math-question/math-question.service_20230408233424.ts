/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MathQuestion } from './math-question.interface';
import { MathQuestion as MathQuestionSchema } from './math-question.schema';

@Injectable()
export class MathQuestionService {
    constructor(
        @InjectModel(MathQuestionSchema.name) private mathQuestionModel: Model<MathQuestionSchema>,
    ) {
        if (!this.mathQuestionModel) {
            console.error('mathQuestionModel is undefined');
        }
    }

    async create(mathQuestion: MathQuestion): Promise<Document> {
        const createdMathQuestion = new this.mathQuestionModel(mathQuestion);
        return createdMathQuestion.save();
    }

    async findAll(): Promise<MathQuestion[]> {
        return this.mathQuestionModel.find().exec();
    }
}
