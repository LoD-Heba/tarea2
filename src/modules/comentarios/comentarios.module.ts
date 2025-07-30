import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from '../prenda/entities/prenda.entity';
import { Comentario } from './entities/comentario.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, User, Prenda])],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
