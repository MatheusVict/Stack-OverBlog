import { Test, TestingModule } from '@nestjs/testing';
import { CommentarysService } from './commentarys.service';

describe('CommentarysService', () => {
  let service: CommentarysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentarysService],
    }).compile();

    service = module.get<CommentarysService>(CommentarysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
