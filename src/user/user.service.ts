import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    return true;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
