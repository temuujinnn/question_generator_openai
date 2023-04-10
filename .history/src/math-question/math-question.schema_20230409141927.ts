/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MathQuestion extends Document {
    @Prop({ required: true })
    question: string;

    @Prop({
        type: {
            optionA: { type: String },
            optionB: { type: String },
            optionC: { type: String },
            optionD: { type: String },
            correctAnswerLetter: { type: String },
            correctAnswer: { type: String },
            lessonTopic: { type: String },
        },
        required: true,
    })
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
