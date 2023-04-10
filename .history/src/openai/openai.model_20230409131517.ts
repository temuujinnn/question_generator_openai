/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

export default registerAs('openai', () => ({
    apiKey: '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',
    model: process.env.OPENAI_MODEL || 'davinci',
}));
