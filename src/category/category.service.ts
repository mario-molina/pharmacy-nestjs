import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResponse } from 'src/shared/service-response.class';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private readonly categoryRepository;

  constructor(
    @InjectRepository(Category) categoryRepository: Repository<Category>
  ) {
    this.categoryRepository = categoryRepository;
  }

  async create(category: CreateCategoryDto): Promise<ServiceResponse> {
    const response = new ServiceResponse();
    try {
      category.created_date = new Date();
      await this.categoryRepository.insert(category);
      response.setCode(HttpStatus.CREATED);
      response.setData(category);
    } catch (e) {
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
    }
    return response;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const response = new ServiceResponse();
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: id },
      });
      if (category != null) response.setData(category);
      else
        throw new HttpException('Product was not found', HttpStatus.NOT_FOUND);
    } catch (e) {
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
    }

    return response;
  }

  async getById(id: number){
    return this.categoryRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, category: UpdateCategoryDto) {
    const response = new ServiceResponse();
    try {
      await this.categoryRepository.update(id, category);
    } catch (e) {
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
    }

    return response;
  }

  remove(id: number) {
    const response = new ServiceResponse();
    try {
      this.categoryRepository.delete(id);
    } catch (e) {
      response.setSuccess(false);
      response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
      response.setMessage(e.message);
    }

    return response;
  }

}

