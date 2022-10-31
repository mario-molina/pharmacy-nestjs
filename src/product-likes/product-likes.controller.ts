import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException} from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { CreateProductLikeDto } from './dto/create-product-like.dto';
import { UpdateProductLikeDto } from './dto/update-product-like.dto';
import {AuthGuard} from "@nestjs/passport";
import {CreateProductDto} from "../product/dto/create-product.dto";
import {UserDto} from "../user/dto/user.dto";

@Controller('product-likes')
export class ProductLikesController {
  private readonly productLikesService;

  constructor(productLikesService: ProductLikesService) {
    this.productLikesService = productLikesService;
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createProductLikeDto: CreateProductLikeDto, @Req() req: any) {
    const user = <UserDto>req.user;
    const res = await this.productLikesService.create(user, createProductLikeDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Get()
  findAll() {
    return this.productLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductLikeDto: UpdateProductLikeDto) {
    return this.productLikesService.update(+id, updateProductLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLikesService.remove(+id);
  }
}
