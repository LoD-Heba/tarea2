import { Module } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { ImagenController } from './imagen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from '../prenda/entities/prenda.entity';
import { Imagen } from './entities/imagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda, Imagen])],
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
