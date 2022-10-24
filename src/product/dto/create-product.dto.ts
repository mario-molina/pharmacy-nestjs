import { IsNotEmpty, IsNumber} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty() name: string;
  description: string;
  @IsNumber() price: number;
  owner: User;
  created_date: Date;
}
