import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadfile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error || !result) {
            console.error('❌ Error al subir:', error || 'Resultado nulo');
            return reject(error || new Error('No se recibió respuesta de Cloudinary'));
          }
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  
}
