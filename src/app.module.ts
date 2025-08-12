import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { PrendaModule } from './modules/prenda/prenda.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
    inject: [ConfigService],
  }), ProfileModule, UserModule, PrendaModule, CategoriaModule, ComentariosModule, ImageModule,
  
  ],
})
export class AppModule {}