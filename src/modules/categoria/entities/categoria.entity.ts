import { Prenda } from 'src/modules/prenda/entities/prenda.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Prenda, prenda => prenda.categorias)
  prendas: Prenda[];
}
