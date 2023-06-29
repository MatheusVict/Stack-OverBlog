import { Test, TestingModule } from '@nestjs/testing';
import { CommentarysController } from './commentarys.controller';
import { CommentarysService } from './commentarys.service';

describe('CommentarysController', () => {
  let controller: CommentarysController;
  let service: CommentarysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentarysController],
      providers: [
        {
          provide: CommentarysService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CommentarysController>(CommentarysController);
    service = module.get<CommentarysService>(CommentarysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
