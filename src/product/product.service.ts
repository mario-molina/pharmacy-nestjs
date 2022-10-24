import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { ServiceResponse } from '../shared/service-response.class';

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

  async create(user: UserDto, product: CreateProductDto, ): Promise<ServiceResponse> {
    let response = new ServiceResponse;
    try{
      const username = user.username;
      // get the user from db
      const owner = await this.userService.findOne({ where: { username } });
      product.created_date = new Date();
      product.owner = owner;
      await this.productRepository.insert(product);
      response.setCode(HttpStatus.CREATED)
      response.setData(product)
    }catch(e){
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
      response.setData(null)
    }
    return response
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<ServiceResponse> {
    let response = new ServiceResponse;
    try{
      let product = await this.productRepository.findOne({ where: { id: id } });
      if (product != null)
        response.setData(product)
      else
        throw new HttpException('Product was not found', HttpStatus.NOT_FOUND); 
    }catch(e){
      response.setSuccess(false);
      response.setCode(HttpStatus.NOT_FOUND);
      response.setMessage('Prduct not found');
      response.setData(null)
    }

    return response
  }

  async update(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    return true;
  }

  async remove(id: number) {
    let response = new ServiceResponse;
    try{
      console.log('here')
      this.productRepository.delete(id); 
    }catch(e){
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
      response.setData(null)
    }

    return response
  }
}
