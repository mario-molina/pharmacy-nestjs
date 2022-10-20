import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  private readonly productRepository;
  private readonly userService;

  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
    userService: UserService
  ) {
    this.productRepository = productRepository;
    this.userService = userService;
  }

  async create(user: UserDto, product: CreateProductDto, ) {
    let username = user.username;
    // get the user from db    
    const owner = await this.userService.findOne({ where: { username } });
    product.created_date = new Date(product.created_date);
    product.owner = owner;
    await this.productRepository.insert(product);
    return product;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({ where: { id: id } });
  }

  async update(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    return true;
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
