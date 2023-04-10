/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('openai', () => ({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'davinci',
}));
