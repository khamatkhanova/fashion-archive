import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.favorite.findMany({include: {product: true}});
  }

  create(dto: CreateFavoriteDto) {
    return this.prisma.favorite.create({data: dto});
  }

  async remove(id: number) {
    const favorite = await this.prisma.favorite.findUnique({where: {id}});
    if (!favorite) throw new NotFoundException(`favorite with id ${id} not found`);
    return this.prisma.favorite.delete({ where:{id}});
  }


  count() {
    return this.prisma.favorite.count();
  }
  findPaginated(page: number, limit: number) {
    const skip = (page-1)*limit;
    return this.prisma.favorite.findMany({skip, take: limit, include: {product: true},});
  }
}