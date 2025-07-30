import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(idUser: number, dto: CreateProfileDto) {
    const user = await this.userRepo.findOne({ where: { id: idUser } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const perfil = this.profileRepo.create({ ...dto, usuario: user });
    return this.profileRepo.save(perfil);
  }

  findAll() {
    return this.profileRepo.find({
      relations: ['usuario'],
      order: { id: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
