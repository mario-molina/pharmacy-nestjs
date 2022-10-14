import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule], // This line executes "migrations" for entities declared
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
