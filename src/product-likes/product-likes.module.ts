import { Module } from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { ProductLikesController } from './product-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ProductLike } from './entities/product-like.entity';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import {UpdateLikesService} from "./update-likes.service";
import {RedisModule} from "../redis/redis.module";

@Module({
  controllers: [ProductLikesController],
  providers: [ProductLikesService, UpdateLikesService],
  imports: [TypeOrmModule.forFeature([ProductLike]), DatabaseModule, UserModule, ProductModule, AuthModule, RedisModule],
  exports: [UpdateLikesService],
})
export class ProductLikesModule {}
