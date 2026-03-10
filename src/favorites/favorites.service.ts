import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany({include: {product: true, user: true},});}

  findOne(id: number) {
    return this.prisma.favorite.findUnique({where:{id},include: {product: true, user: true},});
  }

  create(dto: CreateFavoriteDto) {
    return this.prisma.favorite.create({data: dto});
  }

  update(id: number, dto: UpdateFavoriteDto) {
    return this.prisma.favorite.update({where: {id},data: dto,});
  }

  remove(id: number) {
    return this.prisma.favorite.delete({where:{id}});
  }
}
