import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductLike } from "../../product-likes/entities/product-like.entity";

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn() // Creates an auto incremental id
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  description: string;

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'datetime' })
  created_date: Date;

  @OneToMany(type => ProductLike, productLike => productLike.product) likes: ProductLike[];
}
