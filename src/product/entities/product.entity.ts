import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductLike } from "../../product-likes/entities/product-like.entity";

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

  @Column({ type: 'datetime' })
  created_date: Date;

  @OneToMany(type => ProductLike, productLike => productLike.product) likes: ProductLike[];

  @ManyToOne(type => User) owner?: User;
}
