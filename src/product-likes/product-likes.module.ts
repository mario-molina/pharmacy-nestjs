import { Module } from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { ProductLikesController } from './product-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ProductLike } from './entities/product-like.entity';

@Module({
  controllers: [ProductLikesController],
  providers: [ProductLikesService],
  imports: [TypeOrmModule.forFeature([ProductLike]), DatabaseModule],
})
export class ProductLikesModule {}
