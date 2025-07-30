import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrendaService } from './prenda.service';
import { PrendaController } from './prenda.controller';
import { Prenda } from './entities/prenda.entity';
import { User } from '../user/entities/user.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda, User, Categoria])],
  controllers: [PrendaController],
  providers: [PrendaService],
})
export class PrendaModule {}
