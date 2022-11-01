import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductLikeDto } from './dto/product-like.dto';
import { UserDto } from '../user/dto/user.dto';
import { ServiceResponse } from '../shared/service-response.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ProductLike } from './entities/product-like.entity';
import { ProductService } from '../product/product.service';
import { UpdateLikesService } from './jobs/producer/update-likes.service';

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

  async create(userDto: UserDto, productLike: ProductLikeDto) {
    const response = new ServiceResponse();
    try {
      const username = userDto.username;
      const id = productLike.product;
      // get the user from db
      const user = await this.userService.findOne({ where: { username } });
      const product = await this.productService.findBy({ where: { id } });

      if(product == null)
        throw new NotFoundException(`Product was not found!`);

      productLike.created_date = new Date();
      productLike.user = user;
      productLike.product = product;
      await this.productLikeRepository.insert(productLike);
      response.setCode(HttpStatus.CREATED);
      response.setData(productLike);
      await this.updateLikesService.updateProductLikes(product);
    } catch (e) {
      if (e instanceof NotFoundException) {
        response.setCode(HttpStatus.NOT_FOUND);
      } else if (typeof e === "string") {
        // error as a string action here
      } else {
        response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      response.setSuccess(false);
      response.setMessage(e.message);
    }

    return response;
  }

  async remove(userDto: UserDto, productLike: ProductLikeDto) {
    const response = new ServiceResponse();
    try {
      const username = userDto.username;
      const id = productLike.product;

      // get the user from db
      const user = await this.userService.findOne({ where: { username } });
      const product = await this.productService.findBy({ where: { id } });

      if(product == null)
        throw new NotFoundException(`Product was not found!`);

      const likes = await this.productLikeRepository.find({
        where: { 
          user: {id: user.id}, // Because 'user' is an FK
          product: {id: product.id} // Because 'product' is an FK
        },
      });

      const likesId = likes.map(like => like.id);
      await this.productLikeRepository.delete(likesId);
      response.setCode(HttpStatus.OK);
      response.setData(likes);
      await this.updateLikesService.updateProductLikes(product);
    } catch (e) {
      if (e instanceof NotFoundException) {
        response.setCode(HttpStatus.NOT_FOUND);
      } else if (typeof e === "string") {
        // error as a string action here
      } else {
        response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      response.setSuccess(false);
      response.setMessage(e.message);
    }

    return response;
  }

  async getLikesCount(productId: number) {
    let count = 0
    try {
      const likes = await this.productLikeRepository.find({
        where: {
          product: {id: productId} // Because 'product' is an FK
        },
      });
      count =  likes.length;
    } catch (e) {
      // log error...
    }

    return count;
  }

}
