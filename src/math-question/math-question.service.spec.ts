import { Test, TestingModule } from '@nestjs/testing';
import { MathQuestionService } from './math-question.service';

describe('MathQuestionService', () => {
  let service: MathQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathQuestionService],
    }).compile();

    service = module.get<MathQuestionService>(MathQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
