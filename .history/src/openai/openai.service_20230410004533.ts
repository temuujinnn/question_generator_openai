/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { MathQuestion } from 'src/math-question/math-question.schema';

@Injectable()
export class OpenaiService {
  constructor(
    @InjectModel(MathQuestion.name)
    private sampleDataModel: Model<MathQuestion>,
  ) { }

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

      const createdSampleData = new this.Mat({

        context: question,


        answers: [
          { id: 'a0', isCorrect: false, value: options.A },
          { id: 'a1', isCorrect: false, value: options.B },
          { id: 'a2', isCorrect: false, value: options.C },
          { id: 'a3', isCorrect: false, value: options.D },

        ],
        topic: currentTopic,


        lessonId: '63d1ec0570e816a6ebbf14ca',

      });
      return createdSampleData.save();
    }
    



  } catch(error) {
    console.error(error);
    return null;
  }
}
}