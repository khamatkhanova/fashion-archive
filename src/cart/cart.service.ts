import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cartItem.findMany({include: {product: true, user: true},});
  }

  create(dto:CreateCartDto) {
    return this.prisma.cartItem.create({data:dto});
  }

  remove(id: number) {
    return this.prisma.cartItem.delete({ where:{id}});
  }
}