import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private apiKey: string = process.env.OPENAI_API_KEY;
  private apiUrl =
    'https://api.openai.com/v1/engines/davinci-codex/completions';
console.log(apiKey);
  async generateMathQuestion(): Promise<any> {
    const prompt =
      'Generate a multiple-choice math question with 4 options and the correct answer.';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
