import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { toUserDto } from 'src/shared/mapper';
import { LoginUserDto } from './dto/login-user.dto';
import { comparePasswords } from 'src/shared/util';

@Injectable()
export class UserService {
  private readonly userRepository;

  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async create(user: CreateUserDto) {
    user.created_date = new Date(user.created_date);
    await this.userRepository.insert(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async update(id: number, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    return true;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
    }
    
    // compare passwords    
    const areEqual = await comparePasswords(user.password, password);
    
    if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }
    
    return toUserDto(user);  
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ where:  { username } });  
  }

  
}
