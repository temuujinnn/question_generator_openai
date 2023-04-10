/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MathQuestion {
    @Prop()
    question: string;

    @Prop()
    answer: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctAnswer: string;
    };
}

export type MathQuestionDocument = MathQuestion & Document;
export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);
