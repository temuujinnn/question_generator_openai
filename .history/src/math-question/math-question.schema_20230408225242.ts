/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MathQuestion extends Document {
    @Prop()
    question: string;

    @Prop({
        type: {
            optionA: String,
            optionB: String,
            optionC: String,
            optionD: String,
            correctAnswer: String,
        },
    })
    answer: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctAnswer: string;
    };
}

export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);