import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('product_likes')
export class ProductLike {
  @PrimaryGeneratedColumn() // Creates an auto incremental id
  id: number;

  @Column({ type: 'datetime' })
  created_date: Date;

  @ManyToOne(type => User, user => user.likes) user: User;

  @ManyToOne(type => Product, product => product.likes) product: Product;
}
