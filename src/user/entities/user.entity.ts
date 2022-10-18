import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductLike } from '../../product-likes/entities/product-like.entity';

@Entity('user')
export class User {
  readonly bcrypt = require('bcrypt');

  @PrimaryGeneratedColumn() // Creates an auto incremental id
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 60 })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', default: 'CTM' })
  type: string;

  @Column({ type: 'datetime' })
  created_date: Date;

  @OneToMany(type => ProductLike, productLike => productLike.user) likes: ProductLike[];

  //  the @BeforeInsert() hook gives the developer the opportunity to run any code before saving the Entity in the database
  @BeforeInsert() async hashPassword() {
    this.password = await this.bcrypt.hash(this.password, 10);
  }
}
