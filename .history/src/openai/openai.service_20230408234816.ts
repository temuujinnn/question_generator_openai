/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MathQuestion } from 'src/math-question/math-question.schema';

// @Injectable()
// export class OpenaiService {
//   private apiKey = ;
//   private apiUrl: string =
//     'https://api.openai.com/v1/engines//completions';
//   async generateMathQuestion(): Promise<any> {
//     const prompt = `Generate a math question with four options and answer.
//     Question:
//     Answer options:
//     A.
//     B.
//     C.
//     D.
//     Answer:`;

//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.apiKey}`,
//     };

//     const data = {
//       prompt,
//       maxTokens: 150,
//       n: 1,
//       stop: '\n',
//       temperature: 0.7,
//     };

//     try {
//       const response = await axios.post(this.apiUrl, data, { headers });

//       return response.data.choices[0].text.trim();
//     } catch (error) {
//       console.error(error);
//       console.error(error.response.data);
//       return null;
//     }
//   }
// }

@Injectable()
export class OpenaiService {
  constructor(
    @Inject('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') private readonly openaiApiKey: string,
    @Inject('text-davinci-003') private readonly openaiModel: string,
  ) { }

  async generateMathQuestion(): Promise<MathQuestion> {
    const prompt = `Generate a math question with four options and answer.
    Question:
    Answer options:
    A.
    B.
    C.
    D.
    Answer:`;

    const response = await openai.complete({
      engine: this.openaiModel,
      prompt,
      maxTokens: 150,
      n: 1,
      stop: '\n',
      temperature: 0.7,
    });

    const generatedQuestion = response.data.choices[0].text.trim();
    const answerRegex = /.*\nAnswer:\n(.*)/s;
    const answerOptionsRegex = /.*\nAnswer options:\nA. (.*)\nB. (.*)\nC. (.*)\nD. (.*)\nAnswer:/s;
    const answerOptionsMatches = generatedQuestion.match(answerOptionsRegex);
    const correctAnswer = generatedQuestion.match(answerRegex)[1].trim();
    const answerOptions = answerOptionsMatches.slice(1, 5).map((option) => option.trim());

    return {
      question: generatedQuestion.replace(answerRegex, '').trim(),
      answer: {
        optionA: answerOptions[0],
        optionB: answerOptions[1],
        optionC: answerOptions[2],
        optionD: answerOptions[3],
        correctAnswer,
      },
    };
  }
}
