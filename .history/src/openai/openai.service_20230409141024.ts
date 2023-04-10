/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';

  async generateMathQuestion(_topic: string): Promise<any> {
    const prompt = `Generate a math question for ${_topic} with four options and answer.
    Question:
    Answer options:
    A.
    B.
    C.
    D.
    Answer:`;

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

      console.log(response.data.choices[0].text.trim())

      const generatedQuestion = response.data.choices[0].text.trim();
      const answerRegex = /Answer:\n(.+)/;
      const answerOptionsRegex = /Answer options:\nA\. (.*)\nB\. (.*)\nC\. (.*)\nD\. (.*)\n/;
      const answerOptionsMatches = generatedQuestion.match(answerOptionsRegex);
      const correctAnswerLetter = answerRegex.exec(generatedQuestion)[1].trim().split('. ')[0];
      const correctAnswer = answerRegex.exec(generatedQuestion)[1].trim().split('. ')[1];

      return {
        question: generatedQuestion.replace(answerRegex, '').replace(answerOptionsRegex, '').trim(),
        answer: {
          optionA: answerOptionsMatches[1].trim(),
          optionB: answerOptionsMatches[2].trim(),
          optionC: answerOptionsMatches[3].trim(),
          optionD: answerOptionsMatches[4].trim(),
          correctAnswerLetter,
          correctAnswer,
        }

      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}