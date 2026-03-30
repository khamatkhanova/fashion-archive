import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany({include: {product: true, user: true},});
  }

  create(dto: CreateFavoriteDto) {
    return this.prisma.favorite.create({data: dto});
  }

  remove(id: number) {
    return this.prisma.favorite.delete({where: {id}});
  }
}