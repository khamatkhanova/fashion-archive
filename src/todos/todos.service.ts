import { Injectable } from '@nestjs/common';
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
    return this.prisma.todo.findMany({include: {user:true}});
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({where: {id}, include: {user: true},});
  }

  create(dto: CreateTodoDto) {
    const data = {userId: Number(dto.userId), text: dto.text,completed: dto.completed ?? false,};
    return this.prisma.todo.create({data});
  }

  update(id: number, dto: UpdateTodoDto) {
    const data: any = {};
    if (dto.text !== undefined) data.text = dto.text;
    if (dto.completed !== undefined) data.completed = dto.completed;
    if (dto.userId !== undefined) data.userId = Number(dto.userId);
    return this.prisma.todo.update({ where:{id},data});
  }

  remove(id: number) {
    return this.prisma.todo.delete({where: {id}});
  }
}