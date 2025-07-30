import { IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(2, 30)
  nombre: string;

  @IsString()
  @Length(2, 30)
  apellido: string;

  @IsString()
  telefono?: string;

  @IsString()
  direccion?: string;
}
