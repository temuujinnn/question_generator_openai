/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MathQuestion extends Document {
    @Prop()
    question: string;

    @Prop()
    answer: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctAnswerLetter: string;
        correctAnswer: string;
        lessonTopic: string;
    };
}

export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);
