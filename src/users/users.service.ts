import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({include: {favorites: true, cart: true, todos:true},});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where:{id},include: {favorites: true, cart: true, todos: true },});
  }

  create(dto: CreateUserDto) {
    return this.prisma.user.create({data: dto});
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({where: {id}, data: dto});
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id}});
  }
}