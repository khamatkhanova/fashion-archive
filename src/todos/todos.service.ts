import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany({include: {user:true}});
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({where: {id}, include: {user: true},});
  }

  create(dto: CreateTodoDto) {
    const data = {userId: dto.userId, text: dto.text,completed: dto.completed ?? false,};
    return this.prisma.todo.create({data});
  }

  update(id: number, dto: UpdateTodoDto) {
    const data: any = {};
    if (dto.text !== undefined) data.text = dto.text;
    if (dto.completed !== undefined) data.completed = dto.completed;
    if (dto.userId !== undefined) data.userId = dto.userId;
    return this.prisma.todo.update({ where:{id},data});
  }

  remove(id: number) {
    return this.prisma.todo.delete({where: {id}});
  }
}