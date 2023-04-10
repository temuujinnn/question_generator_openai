/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
// import { QuestionTypeEnum } from "./math-question.interface";

export type MathQuestionData = MathQuestion;
@Schema()
export class MathQuestion {
    /**
     * Асуултын нэр
     */
    @Prop({ required: false, default: "sampledata" })
    name?: string;

    /**
     * Зураг
     */
    @Prop({})
    icon?: string;

    /**
     *
     */
    @Prop({ required: true })
    context: string;

    @Prop({ default: 1000 * 12 })
    duration: number;

    /**
     * Асуултын төрөл холбодог , сонгодог гэх мэт
     */
    // @Prop({
    //     type: String,
    //     enum: enumToArray(QuestionTypeEnum),
    //     default: [QuestionTypeEnum.choose],
    // })
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
                id: { type: String, required: true },
                isCorrect: { type: Boolean },
                value: { type: String },
                icon: { type: String, default: null },
            },
        ],
        required: false,
    })
    answers: {
        id: string;
        isCorrect: boolean;
        value: string;
        icon: string;
    }[];

    //Relations
    @Prop({ type: String, required: false })
    lesson?: string;

    @Prop()
    level?: string;

    @Prop()
    topic?: string;

    @Prop()
    skillLevel?: string;
    // @Prop({
    //   type: String,
    //   enum: enumToArray(QuestionPurposeEnum),
    //   default: [QuestionPurposeEnum.lesson],
    // })
    // purpose: QuestionPurposeEnum;

    @Prop()
    seed: number;

    @Prop({ default: "" })
    explanation: string;

    @Prop({
        type: Types.ObjectId,
        ref: "Lesson",
        required: true,
        default: "63d1ec0570e816a6ebbf14ca",
    })
    lessonId: string;

    @Prop({ type: Number, default: 5000 })
    readDuration: number;
}

export const MathQuestionSchema = SchemaFactory.createForClass(MathQuestion);

export declare function enumToArray(enumType: any): string[];
