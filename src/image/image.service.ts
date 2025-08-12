import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepo: Repository<Image>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadToCloudinary(file: Express.Multer.File) {
    try {
      const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(file.buffer);
      });

      // Guardar en DB
      const image = this.imageRepo.create({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        urlCloud: result.secure_url,
      });

      return await this.imageRepo.save(image);
    } catch (error) {
      throw new InternalServerErrorException('Error uploading to Cloudinary');
    }
  }

  async listAll() {
    return this.imageRepo.find();
  }

  async delete(id: number) {
    const image = await this.imageRepo.findOne({ where: { id } });
    if (!image) return null;

    // Extraer public_id de la URL
    const publicId = image.urlCloud.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await this.imageRepo.remove(image);
    return { message: 'Image deleted successfully' };
  }
}
