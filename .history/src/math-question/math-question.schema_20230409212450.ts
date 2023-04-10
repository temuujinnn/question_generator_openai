/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class MathQuestion extends Document {
//     @Prop()
//     question: string;

//     @Prop({ type: Object })
//     answer: {
//         optionA: string;
//         optionB: string;
//         optionC: string;
//         optionD: string;
//         correctAnswer: string;

//     };
// }

// export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MathQuestion = SampleData & Document;

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
export class MathQuestion {
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

export const SampleDataSchema = SchemaFactory.createForClass(MathQuestion);