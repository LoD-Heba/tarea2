import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PrendaService } from './prenda.service';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { UpdatePrendaDto } from './dto/update-prenda.dto';

@Controller('prenda')
export class PrendaController {
  constructor(private readonly prendaService: PrendaService) {}

  @Post(':idUsuario')
  create(
    @Param('idUsuario') idUsuario: number,
    @Body() createPrendaDto: CreatePrendaDto,
  ) {
    return this.prendaService.create(idUsuario, createPrendaDto);
  }

  @Get()
  findAll(@Query('categoria') categoriaId?: number) {
    return this.prendaService.findAll(categoriaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrendaDto: UpdatePrendaDto) {
    return this.prendaService.update(+id, updatePrendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prendaService.remove(+id);
  }
}
