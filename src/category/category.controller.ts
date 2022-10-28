import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  private readonly categoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const res = await this.categoryService.create(createCategoryDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.categoryService.findOne(id);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const res = await this.categoryService.update(id, updateCategoryDto);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.categoryService.remove(id);
    if (!res.isSuccessful())
      throw new HttpException(res.getMessage(), res.getCode());
    return res;
  }
}
