import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn() // Creates an auto incremental id
    id: number;
  
    @Column({ type: 'varchar', length: 60 })
    name: string;

    @Column({ type: 'varchar', length: 250 })
    description: string;
  
    @Column({ type: 'datetime' })
    created_date: Date;
}
