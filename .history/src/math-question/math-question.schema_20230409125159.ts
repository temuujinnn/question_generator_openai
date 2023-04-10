/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MathQuestionDocument = MathQuestion & Document;

@Schema()
export class MathQuestion {
    @Prop()
    question: string;

    @Prop({ type: Object })
    answer: {
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctAnswer: string;
    };
}

export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);
