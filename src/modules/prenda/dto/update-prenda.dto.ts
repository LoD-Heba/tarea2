import { PartialType } from '@nestjs/mapped-types';
import { CreatePrendaDto } from './create-prenda.dto';

export class UpdatePrendaDto extends PartialType(CreatePrendaDto) {}
