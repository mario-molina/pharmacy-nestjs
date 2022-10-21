import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { UserExistsRule } from '../validation/user-exists.rule';

export class CreateUserDto {
  @IsNotEmpty() @Validate(UserExistsRule) username: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  name: string;
  type: string;
  created_date: Date;
}
