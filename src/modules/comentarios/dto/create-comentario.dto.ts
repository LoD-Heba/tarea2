import { IsString, Length, IsInt } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @Length(1, 300)
  contenido: string;

  @IsInt()
  idPrenda: number;
}
