import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }


  count() {
    return this.prisma.product.count();
  }
  findPaginated(page: number, limit: number) {
    const skip = (page-1)*limit;
    return this.prisma.product.findMany({skip, take: limit,});
  }
}