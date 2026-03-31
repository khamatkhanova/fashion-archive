import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }
  async findById(id: number) {
    const product = await this.prisma.product.findUnique({where: {id},});

    if (!product) {throw new NotFoundException(`product with id ${id} not found`);}
    return product;
  }

  count() {
    return this.prisma.product.count();
  }
  findPaginated(page: number, limit: number) {
    const skip = (page-1)*limit;
    return this.prisma.product.findMany({skip, take: limit,});
  }
}