import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cartItem.findMany({include: {product: true},});
  }

  create(dto:CreateCartDto) {
    return this.prisma.cartItem.create({data:dto});
  }

  async remove(id: number) {
    const item = await this.prisma.cartItem.findUnique({where: {id}});
    if (!item) throw new NotFoundException(`item with id ${id} not found`);
    return this.prisma.cartItem.delete({ where:{id}});
  }


  count() {
    return this.prisma.cartItem.count();
  }
  findPaginated(page: number, limit: number) {
    const skip = (page-1)*limit;
    return this.prisma.cartItem.findMany({skip, take: limit, include: {product: true},});
  }
}