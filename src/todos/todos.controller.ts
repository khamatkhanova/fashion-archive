import { Controller, Get, Post, Body, Param, Res, Sse } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import type { Response } from 'express';
import { map } from 'rxjs/operators';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Sse('sse')
  sse() {
    return this.todosService.stream.pipe(map((data)=>({data})));
  }

  @Get()
  async index(@Res() res: Response) {
    const todos = await this.todosService.findAll();
    return res.render('todos/index', { todos });
  }

  @Get('add')
  addPage(@Res() res: Response) {
    return res.render('todos/add');
  }

  @Post()
  async create(@Body() dto: CreateTodoDto, @Res() res: Response) {
    await this.todosService.create(dto);
    this.todosService.notify('create');
    return res.redirect('/todos');
  }

  @Get(':id/edit')
  async editPage(@Param('id') id: string, @Res() res: Response) {
    const todo = await this.todosService.findOne(+id);
    return res.render('todos/edit',{todo});
  }

  @Post(':id/patch')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @Res() res: Response) {
    const completedBoolean = Boolean(dto.completed);
    const updateData: UpdateTodoDto = {text: dto.text,completed: completedBoolean,userId: dto.userId?Number(dto.userId) : undefined,};
    await this.todosService.update(+id, updateData);
    this.todosService.notify('update');
    return res.redirect('/todos');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string,@Res() res: Response) {
    await this.todosService.remove(+id);
    this.todosService.notify('remove');
    return res.redirect('/todos');
  }
}