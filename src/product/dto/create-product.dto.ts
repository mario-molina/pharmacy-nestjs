import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty() name: string;
  description: string;
  price: number;
  created_date: Date;
}
