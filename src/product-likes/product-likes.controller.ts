import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLikesService } from './product-likes.service';
import { CreateProductLikeDto } from './dto/create-product-like.dto';
import { UpdateProductLikeDto } from './dto/update-product-like.dto';

@Controller('product-likes')
export class ProductLikesController {
  constructor(private readonly productLikesService: ProductLikesService) {}

  @Post()
  create(@Body() createProductLikeDto: CreateProductLikeDto) {
    return this.productLikesService.create(createProductLikeDto);
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
