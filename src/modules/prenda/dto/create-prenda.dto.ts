import { IsString, IsNotEmpty, IsNumber, IsPositive, IsArray } from 'class-validator';

export class CreatePrendaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsString()
  estado: string;

  @IsString()
  talla: string;

  @IsString()
  marca: string;

  @IsArray()
  categoriasIds: number[];
}
