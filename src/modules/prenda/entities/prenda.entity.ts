import { Categoria } from 'src/modules/categoria/entities/categoria.entity';
import { Comentario } from 'src/modules/comentarios/entities/comentario.entity';
import { Imagen } from 'src/modules/imagen/entities/imagen.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity("prendas")
export class Prenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  estado: string;

  @Column()
  talla: string;

  @Column()
  marca: string;

  @ManyToOne(() => User, user => user.prendas)
  usuario: User;

  @ManyToMany(() => Categoria, categoria => categoria.prendas, { cascade: true }) //eliminar en cascada
  @JoinTable()
  categorias: Categoria[];

  @OneToMany(() => Imagen, imagen => imagen.prenda, { cascade: true })
  imagenes: Imagen[];

  @OneToMany(() => Comentario, comentario => comentario.prenda, { cascade: true })
  comentarios: Comentario[];

}
