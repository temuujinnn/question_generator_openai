/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SampleDataDocument = SampleData & Document;

@Schema()
export class Answer {
    @Prop({ required: true })
    isCorrect: boolean;

    @Prop({ required: true })
    value: string;

    @Prop({ required: true })
    id: string;
}

@Schema()
export class SampleData {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    context: string;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true, type: [Answer] })
    answers: Answer[];

    @Prop()
    topic: string;

    @Prop({ required: true })
    skillLevel: number;

    @Prop({ required: true })
    explanation: string;

    @Prop({ required: true })
    lessonId: string;

    @Prop({ required: true })
    readDuration: number;
}

export const SampleDataSchema = SchemaFactory.createForClass(SampleData);
