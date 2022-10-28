import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ProductLikesModule } from './product-likes/product-likes.module';
import { AuthModule } from './auth/auth.module';
import { UserExistsRule } from './user/validation/user-exists.rule';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, UserModule, ProductLikesModule, AuthModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, UserExistsRule], // add here rules classes that needs dependency injection
})
export class AppModule {}
