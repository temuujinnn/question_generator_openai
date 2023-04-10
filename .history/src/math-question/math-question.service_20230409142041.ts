/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MathQuestion } from './math-question.schema';


@Injectable()
export class MathQuestionService {
    constructor(@InjectModel(MathQuestion.name) private mathQuestionModel: Model<MathQuestionDocument>) { }

    async create(mathQuestion: MathQuestion): Promise<MathQuestion> {
        const createdMathQuestion = new this.mathQuestionModel(mathQuestion);
        return createdMathQuestion.save();
    }

    async findAll(): Promise<MathQuestion[]> {
        return this.mathQuestionModel.find().exec();
    }
}
