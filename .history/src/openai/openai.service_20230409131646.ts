/* eslint-disable prettier/prettier */

import { Inject, Injectable } from '@nestjs/common';
import * as openai from 'openai';

@Injectable()
export class OpenaiService {

  constructor(@Inject(OPENAI_MODEL) private readonly openaiModel: string) { }
  async generateMathQuestion(): Promise<any> {



    const response = await openai.complete({
      engine: 'davinci-codex',
      prompt: prompt,
      maxTokens: 150,
      n: 1,
      stop: '\n',
      temperature: 0.7,
    });

    try {
      const generatedQuestion = response.data.choices[0].text.trim();
      const answerRegex = /.*\nAnswer:\n(.*)/s;
      const answerOptionsRegex = /.*\nAnswer options:\nA. (.*)\nB. (.*)\nC. (.*)\nD. (.*)\nAnswer:/s;
      const answerOptionsMatches = generatedQuestion.match(answerOptionsRegex);
      const correctAnswer = generatedQuestion.match(answerRegex)[1].trim();
      const answerOptions = answerOptionsMatches.slice(1, 5).map((option) => option.trim());
      console.log({
        question: generatedQuestion.replace(answerRegex, '').trim(),
        answer: {
          optionA: answerOptions[0],
          optionB: answerOptions[1],
          optionC: answerOptions[2],
          optionD: answerOptions[3],
          correctAnswer,
        },
      })
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
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}