import { Module } from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { ProductLikesController } from './product-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ProductLike } from './entities/product-like.entity';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { UpdateLikesService } from './jobs/producer/update-likes.service';
import { QueueModule } from 'src/queue/queue.module';
import { UpdateLikesConsumer } from './jobs/consumer/update-like-consumer.service';

@Module({
  controllers: [ProductLikesController],
  providers: [ProductLikesService, UpdateLikesService, UpdateLikesConsumer],
  imports: [TypeOrmModule.forFeature([ProductLike]), DatabaseModule, UserModule, ProductModule, AuthModule, QueueModule],
  exports: [UpdateLikesService, UpdateLikesConsumer],
})
export class ProductLikesModule {}
