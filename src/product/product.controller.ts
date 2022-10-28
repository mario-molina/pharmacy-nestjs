import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/user/dto/user.dto';
import { OwnersGuard } from 'src/product/guards/owner.guard';
import { Pagination } from 'src/pagination/pagination';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    const user = <UserDto>req.user;
    const category = await this.categoryService.getById(req.category_id);
    const res = await this.productService.create(user, category, createProductDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/paginated')
  async findAllPaginated(@Req() request): Promise<Pagination<Product>>{
    return await this.productService.fetchPaginated({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 5,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Get(':id') // urls = /product/:id
  async findOne(@Param('id') id: number) {
    const res = await this.productService.findOne(id);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    const res = await this.productService.update(id, updateProductDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), OwnersGuard) // --> validate that the user us logged in and the product was created by the user
  async remove(@Param('id') id: number) {
    const res = await this.productService.remove(id);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }
}
