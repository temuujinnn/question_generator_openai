/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
  private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';

  async generateMathQuestion(): Promise<any> {
    const prompt = `Generate a multiple-choice Mathematic question with 4 options and the correct answer JSON.  
    
    example: 
    [{ "question": '', 'answer': ['optionA': '', 'optionB': '', 'optionC': '', 'optionD': '', correctAnswer: ''] }]`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
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
      console.log(response.data)
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}