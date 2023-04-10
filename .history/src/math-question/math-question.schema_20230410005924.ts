/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { QuestionPurposeEnum } from "./math-question.interface";
// import { QuestionTypeEnum } from "./math-question.interface";

export type MathQuestionData = MathQuestion;
@Schema()
export class MathQuestion {
    @Prop({ required: false, default: "sampledata" })
    name?: string;
    @Prop({})
    icon?: string;
    @Prop({ required: true })
    context: string;

    @Prop({ default: 1000 * 12 })
    duration: number;
    @Prop({ default: 'choose' })
    type: string;

    @Prop({
        type: [
            {
                text: { type: String, default: "" },
                icon: { type: String, default: null },
            },
        ],
    })
    hints: {
        text: string;
        icon?: string;
    }[];

    @Prop({
        type: [
            {

                isCorrect: { type: Boolean },
                value: { type: String },

            },
        ],
        required: true,
    })
    answers: {

        isCorrect: boolean;
        value: string;

    }[];

    //Relations
    @Prop({ type: String, required: false })
    lesson?: string;

    @Prop()
    level?: string;

    @Prop({ default: '' })
    topic?: string;

    @Prop({ default: 10 })
    skillLevel?: number;
    @Prop({
        type: String,

        default: 'choose',
    })

    @Prop({ default: 0 })
    seed: number;


    @Prop({ default: "" })
    explanation: string;

    @Prop({
        type: Types.ObjectId,
        ref: "Lesson",
        required: true,
        default: "64266f8ea61fa996674cd82c",
    })
    lessonId: string;

    @Prop({ type: Number, default: 5000 })
    readDuration: number;
}

export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);

export declare function enumToArray(enumType: any): string[];
