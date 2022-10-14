import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, UserModule], // This line executes "migrations" for entities declared
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
