import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { cloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, cloudinaryProvider],
  exports: [CloudinaryService, cloudinaryProvider], //Para que pueda ser usador en cualquier sitio
})
export class CloudinaryModule {}
