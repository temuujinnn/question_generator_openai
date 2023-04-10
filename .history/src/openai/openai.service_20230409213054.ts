/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {


  private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';
  async isDuplicate(question1: string, question2: string): Promise<boolean> {
    const prompt = `Are the following math questions duplicates?\nQuestion 1: ${question1}\nQuestion 2: ${question2}\nAnswer: `;

    // Your existing code for headers and data
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
      const generatedAnswer = response.data.choices[0].text.trim().toLowerCase();
      return generatedAnswer === 'yes';
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  // Inside OpenaiService class
  async checkAnswer(question: string, answer: string): Promise<boolean> {
    const prompt = `Is "${answer}" the correct answer to the math question: ${question}?\nAnswer: `;

    // Your existing code for headers and data
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
      const generatedAnswer = response.data.choices[0].text.trim().toLowerCase();
      return generatedAnswer === 'yes';
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async generateMathQuestion(currentSubject: any, currentTopic: any): Promise<any> {
    const prompt = `Generate a ${currentSubject} question for ${currentTopic} with four options and an answer. Use the following format:
Question: *Question*
Options:
A. *Option A*
B. *Option B*
C. *Option C*
D. *Option D*
Answer: *Correct Answer Letter*
Lesson topic: *Lesson Topic*`;

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
      const lines = generatedQuestion.split('\n');
      const question = lines[0].substring("Question: ".length).trim();
      const options = {
        A: lines[2].substring("A. ".length).trim(),
        B: lines[3].substring("B. ".length).trim(),
        C: lines[4].substring("C. ".length).trim(),
        D: lines[5].substring("D. ".length).trim(),
      };
      const correctAnswerLetter = lines[6].substring("Answer: ".length).trim();


      return {
        question,
        answer: [
          optionA: options.A,
          optionB: options.B,
          optionC: options.C,
          optionD: options.D,
          correctAnswer: correctAnswerLetter,
          topic: currentTopic

        ]
      };



    } catch (error) {
      console.error(error);
      return null;
    }
  }
}