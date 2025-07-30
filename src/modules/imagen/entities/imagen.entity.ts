import { Prenda } from 'src/modules/prenda/entities/prenda.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity("imagenes")
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Prenda, prenda => prenda.imagenes)
  prenda: Prenda;
}
