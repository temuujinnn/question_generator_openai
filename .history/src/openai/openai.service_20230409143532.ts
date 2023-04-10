/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MathQuestion } from 'src/math-question/math-question.schema';

@Injectable()
export class OpenaiService {
  async saveMathQuestion(questionData: any): Promise<MathQuestion> {
    const createdQuestion = new this.mathQuestionModel(questionData);
    return createdQuestion.save();
  }
  private apiKey = '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';
  private apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';

  async generateMathQuestion(): Promise<any> {
    const prompt = `Generate a math question for "linear math" with four options and answer.
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

      const generatedQuestion = response.data.choices[0].text.trim();

      const answerRegex = /Answer:\n(.+)/;
      const answerOptionsRegex = /Answer options:\nA\. (.*)\nB\. (.*)\nC\. (.*)\nD\. (.*)\n/;
      const lessonTopicRegex = /Lesson topic:\n(.+)/;
      const answerOptionsMatches = generatedQuestion.match(answerOptionsRegex);
      const correctAnswerLetter = answerRegex.exec(generatedQuestion)[1].trim().split('. ')[0];
      const correctAnswer = answerRegex.exec(generatedQuestion)[1].trim().split('. ')[1];
      console.log(correctAnswer);
      const lessonTopic = lessonTopicRegex.exec(generatedQuestion)[1].trim();
      const questionData = {
        question: generatedQuestion.replace(answerRegex, '').replace(answerOptionsRegex, '').replace(lessonTopicRegex, '').trim(),
        answer: {
          optionA: answerOptionsMatches[1].trim(),
          optionB: answerOptionsMatches[2].trim(),
          optionC: answerOptionsMatches[3].trim(),
          optionD: answerOptionsMatches[4].trim(),
          correctAnswerLetter,
          correctAnswer,
          lessonTopic,
        },
      };
      const savedQuestion = await this.saveMathQuestion(questionData);

      return {
        question: generatedQuestion.replace(answerRegex, '').replace(answerOptionsRegex, '').replace(lessonTopicRegex, '').trim(),
        answer: {
          optionA: answerOptionsMatches[1].trim(),
          optionB: answerOptionsMatches[2].trim(),
          optionC: answerOptionsMatches[3].trim(),
          optionD: answerOptionsMatches[4].trim(),
          correctAnswerLetter,
          correctAnswer,
          lessonTopic,
        },
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}