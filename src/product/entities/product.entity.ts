import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductLike } from '../../product-likes/entities/product-like.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn() // Creates an auto incremental id
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image: string;

  @Column({ type: 'datetime' })
  created_date: Date;

  @OneToMany(type => ProductLike, productLike => productLike.product)
  likes: ProductLike[];

  // add column explicitly here
  @Column({ name: 'owner' }) // --> name of the column in database
  owner: number; // --> object field
  @ManyToOne(type => User)
  @JoinColumn({ name: 'owner' }) // --> name of the column in database
  userId: User;

  @Column({ name: 'categoryId' })
  categoryId: number;
  @ManyToOne(type => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'integer', nullable: true })
  total_likes: number;
}
