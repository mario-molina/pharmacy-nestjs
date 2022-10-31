import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductLikeDto } from './dto/create-product-like.dto';
import { UpdateProductLikeDto } from './dto/update-product-like.dto';
import { UserDto } from '../user/dto/user.dto';
import { ServiceResponse } from '../shared/service-response.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ProductLike } from './entities/product-like.entity';
import { ProductService } from '../product/product.service';
import {UpdateLikesService} from "./update-likes.service";

@Injectable()
export class ProductLikesService {
  private readonly productLikeRepository;
  private readonly userService;
  private readonly productService;
  private readonly updateLikesService;

  constructor(
    @InjectRepository(ProductLike) productLikeRepository: Repository<ProductLike>,
    userService: UserService,
    productService: ProductService,
    updateLikesService: UpdateLikesService,
  ) {
    this.productLikeRepository = productLikeRepository;
    this.userService = userService;
    this.productService = productService;
    this.updateLikesService = updateLikesService;
  }

  async create(userDto: UserDto, productLike: CreateProductLikeDto) {
    const response = new ServiceResponse();
    try {
      const username = userDto.username;
      const id = productLike.product;
      // get the user from db
      const user = await this.userService.findOne({ where: { username } });
      const product = await this.productService.findBy({ where: { id } });
      productLike.created_date = new Date();
      productLike.userId = user;
      productLike.productId = product;
      await this.productLikeRepository.insert(productLike);
      response.setCode(HttpStatus.CREATED);
      response.setData(productLike);
      await this.updateLikesService.updateProductLikes(product);
    } catch (e) {
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
    }

    return response;
  }

  findAll() {
    return `This action returns all productLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productLike`;
  }

  update(id: number, updateProductLikeDto: UpdateProductLikeDto) {
    return `This action updates a #${id} productLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} productLike`;
  }
}
