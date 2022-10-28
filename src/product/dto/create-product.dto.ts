import { IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty() name: string;
  description: string;
  @IsNumber() price: number;
  owner: User;
  @IsNumber() categoryId: number;
  category: Category;
  created_date: Date;
}
