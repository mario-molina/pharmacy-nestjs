import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException} from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { ProductLikeDto } from './dto/product-like.dto';
import {AuthGuard} from "@nestjs/passport";
import {UserDto} from "../user/dto/user.dto";

@Controller('product-likes')
export class ProductLikesController {
  private readonly productLikesService;

  constructor(productLikesService: ProductLikesService) {
    this.productLikesService = productLikesService;
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createProductLikeDto: ProductLikeDto, @Req() req: any) {
    const user = <UserDto>req.user;
    const res = await this.productLikesService.create(user, createProductLikeDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Delete()
  @UseGuards(AuthGuard())
  async remove(@Body() deleteProductLikeDto: ProductLikeDto, @Req() req: any) {
    const user = <UserDto>req.user;
    const res = await this.productLikesService.remove(user, deleteProductLikeDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }
}
