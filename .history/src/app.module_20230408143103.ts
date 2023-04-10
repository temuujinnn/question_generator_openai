import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [
    // ... existing imports
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService], // Add OpenaiService here
})
export class AppModule {}
