import { UserDto } from "src/user/dto/user.dto";
import { User } from "src/user/entities/user.entity";

export const toUserDto = (data: User): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};