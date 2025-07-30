import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { User } from '../user/entities/user.entity';
import { Prenda } from '../prenda/entities/prenda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario) private repo: Repository<Comentario>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Prenda) private prendaRepo: Repository<Prenda>,
  ) {}

  async create(idUsuario: number, dto: CreateComentarioDto) {
    const user = await this.userRepo.findOne({ where: { id: idUsuario } });
    const prenda = await this.prendaRepo.findOne({
      where: { id: dto.idPrenda },
    });

    if (!user || !prenda) {
      throw new NotFoundException('Usuario o prenda no encontrada');
    }

    const comentario = this.repo.create({
      contenido: dto.contenido,
      usuario: user,
      prenda: prenda,
    });

    return this.repo.save(comentario);
  }
  findAll() {
    return this.repo.find();
  }

  async listarComentariosPorPrenda(idPrenda: number) {
    return this.repo.find({
      where: { prenda: { id: idPrenda } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
