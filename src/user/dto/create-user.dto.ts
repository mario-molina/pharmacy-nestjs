import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  name: string;
  type: string;
  created_date: Date;
}
