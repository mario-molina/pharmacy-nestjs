import { IsNumber } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

export class ProductLikeDto {
  @IsNumber() product: number;
  productId: Product;
  user: User;
  created_date: Date;
}
