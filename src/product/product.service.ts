import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  private readonly productRepository;

  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
  ) {
    this.productRepository = productRepository;
  }

  async create(product: CreateProductDto) {
    product.created_date = new Date(product.created_date);
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
