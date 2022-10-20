import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ProductLikesModule } from './product-likes/product-likes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, UserModule, ProductLikesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
