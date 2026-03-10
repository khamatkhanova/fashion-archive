import { Controller, Get, Post, Patch, Delete, Body, Param, Res } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import type { Response } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const todos = await this.todosService.findAll();
    return res.render('todos/index', {todos});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const todo = await this.todosService.findOne(+id);
    return res.render('todos/show', {todo});
  }

  @Get('add')
  addPage(@Res() res: Response) {
    return res.render('todos/add');
  }

  @Post()
  async create(@Body() body: CreateTodoDto, @Res() res: Response) {
    const todo = await this.todosService.create(body);
    return res.redirect(`/todos/${todo.id}`);
  }

  @Get(':id/edit')
  async editPage(@Param('id') id: string,@Res() res: Response) {
    const todo= await this.todosService.findOne(+id);
    return res.render('todos/edit', {todo});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTodoDto, @Res() res: Response) {
    await this.todosService.update(+id, body);
    return res.redirect(`/todos/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.todosService.remove(+id);
    return res.redirect('/todos');
  }
}