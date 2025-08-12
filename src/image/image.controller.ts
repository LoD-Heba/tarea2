import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))

  
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadToCloudinary(file);
  }

  @Get()
  async listAll() {
    return this.imageService.listAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.delete(id);
  }
}
