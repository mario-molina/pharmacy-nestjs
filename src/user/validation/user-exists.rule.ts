import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  private readonly userService;

  constructor(usersService: UserService) {
    this.userService = usersService;
  }

  async validate(value: string) {
    // If returns false then validation failed, if returns true then validation passed
    let user;
    try {
      user = await this.userService.findOne({ where: { username: value } });
    } catch (e) {
      return false;
    }

    return user == null;
  }

  defaultMessage(args: ValidationArguments) {
    // default message when validate() returns false
    return `User already exists`;
  }
}
