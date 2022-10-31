import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class UpdateLikesConsumer {
  @Process('update-likes-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
