import { PartialType } from '@nestjs/mapped-types';
import { ProductLikeDto } from './product-like.dto';

export class UpdateProductLikeDto extends PartialType(ProductLikeDto) {}
