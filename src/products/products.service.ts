import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({where: {id},});
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({data: dto,});
  }

  update(id: number, dto: UpdateProductDto) {
    return this.prisma.product.update({where: {id},data: dto,});
  }

  remove(id: number) {
    return this.prisma.product.delete({where: {id},});
  }
}