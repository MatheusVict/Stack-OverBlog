import { Test, TestingModule } from '@nestjs/testing';
import { CommentarysController } from './commentarys.controller';

describe('CommentarysController', () => {
  let controller: CommentarysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentarysController],
    }).compile();

    controller = module.get<CommentarysController>(CommentarysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
