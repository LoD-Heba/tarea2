import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';
import { Prenda } from '../prenda/entities/prenda.entity';

@Injectable()
export class ImagenService {
  constructor(
    @InjectRepository(Imagen) private imagenRepo: Repository<Imagen>,
    @InjectRepository(Prenda) private prendaRepo: Repository<Prenda>,
  ) {}

  async guardarRutaImagen(idPrenda: number, filename: string) {
    const prenda = await this.prendaRepo.findOne({ where: { id: idPrenda } });
    if (!prenda) throw new NotFoundException('Prenda no encontrada');

    const nuevaImagen = this.imagenRepo.create({
      url: `/uploads/${filename}`,
      prenda,
    });

    return this.imagenRepo.save(nuevaImagen);
  }
}
