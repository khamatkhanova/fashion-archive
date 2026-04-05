import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Subject } from 'rxjs';

@Injectable()
export class TodosService {
  private updates = new Subject<{ event: string }>();
  constructor(private prisma: PrismaService) {}

  get stream() {return this.updates.asObservable();}
  notify(event:'create'|'update'|'remove') {
    this.updates.next({event});
  }

  findAll() {
    return this.prisma.todo.findMany;
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({where: {id}, include: {user: true}});
    if (!todo) throw new NotFoundException(`todo with id ${id} not found`);
    return todo;
  }

  create(dto: CreateTodoDto) {
    const data = {userId: Number(dto.userId), text: dto.text,completed: dto.completed ?? false,};
    return this.prisma.todo.create({data});
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({where: {id}});
    if (!todo) throw new NotFoundException(`todo with id ${id} not found`);
    const data: any = {};
    if (dto.text !== undefined) data.text = dto.text;
    if (dto.completed !== undefined) data.completed = dto.completed;
    if (dto.userId !== undefined) data.userId = Number(dto.userId);
    return this.prisma.todo.update({ where:{id},data});
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.findUnique({where: {id}});
    if (!todo) throw new NotFoundException(`todo with id ${id} not found`);
    return this.prisma.todo.delete({where: {id}});
  }


  count() {
    return this.prisma.todo.count();
  }
  findPaginated(page: number, limit: number) {
    const skip = (page-1)*limit;
    return this.prisma.todo.findMany({skip, take: limit,});
  }
}