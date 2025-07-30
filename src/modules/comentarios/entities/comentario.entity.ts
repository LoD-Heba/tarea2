import { Prenda } from 'src/modules/prenda/entities/prenda.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity("comentarios")
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contenido: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => User, user => user.comentarios)
  usuario: User;

  @ManyToOne(() => Prenda, prenda => prenda.comentarios)
  prenda: Prenda;
}
