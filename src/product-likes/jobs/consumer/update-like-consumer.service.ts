import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ProductService } from 'src/product/product.service';

@Processor('message-queue') // --> queue to process
export class UpdateLikesConsumer {
  private readonly productService;

  constructor(
    productService: ProductService,
  ) {
    this.productService = productService;
  }

  @Process('update-likes-job') // --> job to execute
  async readOperationJob(job: Job<any>) {
    /*setTimeout(() => {
      console.log(job.data);
    },10000);*/
    const id = job.data.product;
    const product = await this.productService.findBy({ where: { id } })
    let likes = product.total_likes
    product.total_likes = likes + 1;
    await this.productService.update(id, product);
  }
}
