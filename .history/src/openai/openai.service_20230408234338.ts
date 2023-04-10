/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private apiKey = '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';
  private apiUrl: string =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';
  async generateMathQuestion(): Promise<any> {
    const prompt = `Generate a math question with four options and answer.
    Question:
    Answer options:
    A.
    B.
    C.
    D.
    Answer:`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      return null;
    }
  }
}
