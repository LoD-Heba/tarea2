import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { UpdatePrendaDto } from './dto/update-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prenda } from './entities/prenda.entity';
import { User } from '../user/entities/user.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrendaService {
  constructor(
    @InjectRepository(Prenda) private prendaRepo: Repository<Prenda>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Categoria) private catRepo: Repository<Categoria>,
  ) {}

  async create(idUsuario: number, dto: CreatePrendaDto) {
    const user = await this.userRepo.findOneBy({ id: idUsuario });

    const categorias = await this.catRepo.findByIds(dto.categoriasIds);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const nueva = this.prendaRepo.create({
      ...dto,
      usuario: user,
      categorias,
    });

    return this.prendaRepo.save(nueva);
  }

  findAll(categoriaId?: number) {
    const query = this.prendaRepo
      .createQueryBuilder('prenda')
      .leftJoinAndSelect('prenda.categorias', 'categorias');

    if (categoriaId) {
      query.andWhere('categoria.id = :categoriaId', { categoriaId });
    }
    return this.prendaRepo.find({
      relations: ['usuario', 'categorias', 'imagenes'],
      order: { id: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} prenda`;
  }

  update(id: number, updatePrendaDto: UpdatePrendaDto) {
    return `This action updates a #${id} prenda`;
  }

  remove(id: number) {
    return `This action removes a #${id} prenda`;
  }
}
