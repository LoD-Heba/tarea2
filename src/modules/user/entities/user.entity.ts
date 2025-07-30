import { Comentario } from 'src/modules/comentarios/entities/comentario.entity';
import { Prenda } from 'src/modules/prenda/entities/prenda.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @OneToOne(() => Profile, (perfil) => perfil.usuario, { cascade: true })
  perfil: Profile;

  @OneToMany(() => Prenda, (prenda) => prenda.usuario)
  prendas: Prenda[];

  @OneToMany(() => Comentario, (comentario) => comentario.usuario)
  comentarios: Comentario[];
}
