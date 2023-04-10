/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';

  async generateMathQuestion(): Promise<any> {
    const prompt = `Generate a math question with four options and answer.
      Question:
    Answer options:
    A.
      B.
      C.
      D.
      Answer: `;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      const generatedQuestion = response.data.choices[0].text.trim();
      const answerRegex = /.*\nAnswer:\n(.*)/s;
      const answerOptionsRegex = /.*\nAnswer options:\nA. (.*)\nB. (.*)\nC. (.*)\nD. (.*)\nAnswer:/s;
      const answerOptionsMatches = generatedQuestion.match(answerOptionsRegex);
      const correctAnswer = generatedQuestion.match(answerRegex)[1].trim();
      const answerOptions = answerOptionsMatches.slice(1, 5).map((option) => option.trim());
      console.log(response.data.choices[0].text.trim());

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