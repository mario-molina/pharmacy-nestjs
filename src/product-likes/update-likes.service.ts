import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Product } from '../product/entities/product.entity';
import { Queue } from 'bull';

@Injectable()
export class UpdateLikesService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async updateProductLikes(product: Product) {
    // implement logic delete the file record from database.
    await this.queue.add('update-likes-job', {
      product: product.id,
    });
  }
}
