import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ProductLikesService } from 'src/product-likes/product-likes.service';
import { ProductService } from 'src/product/product.service';

@Processor('message-queue') // --> queue to process
export class UpdateLikesConsumer {
  private readonly productService;
  private readonly productLikesService;

  constructor(
    productService: ProductService,
    productLikesService: ProductLikesService
  ) {
    this.productService = productService;
    this.productLikesService = productLikesService;
  }

  @Process('update-likes-job') // --> job to execute
  async readOperationJob(job: Job<any>) {
    /*setTimeout(() => {
      console.log(job.data);
    },10000);*/
    const id = job.data.product.id;
    const product = await this.productService.findBy({ where: { id } })
    const totalLikes = await this.productLikesService.getLikesCount(id);
    product.total_likes = totalLikes;
    await this.productService.update(id, product);
  }
}
