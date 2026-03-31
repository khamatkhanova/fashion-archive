import {Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UsePipes, ValidationPipe, Query, NotFoundException} from '@nestjs/common';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import { createPaginationLinks } from '../pagination';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TodoResponseDto } from './dto/response-todo.dto';

@ApiTags('Todos')
@Controller('api/todos')
export class TodosApiController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({summary: 'получить список задач'})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiResponse({status: 200, description: 'список задач', type: TodoResponseDto})
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const total = await this.todosService.count();
    const items = await this.todosService.findPaginated(Number(page), Number(limit));

    const route = '/api/todos';
    const linkHeader = createPaginationLinks({page: Number(page), limit: Number(limit), total, route});

    return {
      headers: {Link: linkHeader},
      data: {total, page: Number(page), limit: Number(limit), items},
    };
  }

  @Get(':id')
  @ApiOperation({summary: 'получить задачу'})
  @ApiResponse({status: 200, description: 'задача найдена', type: TodoResponseDto})
  @ApiResponse({status: 404, description: 'задача не найдена'})
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOperation({summary: 'cоздать новую задачу'})
  @ApiBody({type: CreateTodoDto})
  @ApiResponse({status: 201, description: 'задача создана'})
  @ApiResponse({status: 400, description: 'ошибка валидации данных'})
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true}))
  @ApiOperation({summary: 'обновить задачу'})
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({status: 200, description: 'задача обновлена'})
  @ApiResponse({status: 400, description: 'ошибка валидации данных'})
  @ApiResponse({status: 404, description: 'задача не найдена' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto) {
    const todo = await this.todosService.findOne(id);
    if (!todo) {throw new NotFoundException(`todo with id ${id} not found`);}
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'удалить задачу'})
  @ApiResponse({status: 200, description: 'задача удалена'})
  @ApiResponse({status: 404, description: 'задача не найдена'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}