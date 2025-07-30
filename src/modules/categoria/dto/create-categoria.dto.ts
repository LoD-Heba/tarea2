import { IsString, Length } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @Length(2, 30)
  nombre: string;
}
