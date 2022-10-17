import { Test, TestingModule } from '@nestjs/testing';
import { ProductLikesController } from './product-likes.controller';
import { ProductLikesService } from './product-likes.service';

describe('ProductLikesController', () => {
  let controller: ProductLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLikesController],
      providers: [ProductLikesService],
    }).compile();

    controller = module.get<ProductLikesController>(ProductLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
