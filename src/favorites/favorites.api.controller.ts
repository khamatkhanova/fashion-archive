import {Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Query, UsePipes, ValidationPipe,} from '@nestjs/common';
import {FavoritesService} from './favorites.service';
import {CreateFavoriteDto} from './dto/create-favorite.dto';
import {createPaginationLinks} from '../pagination';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam,} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('api/favorites')
export class FavoritesApiController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({summary: 'получить список товаров в избранном'})
  @ApiQuery({name: 'page', required: false, example: 1})
  @ApiQuery({name: 'limit', required: false, example: 10})
  @ApiResponse({status: 200, description: 'список избранного'})
  @ApiResponse({status: 400, description: 'некорректные параметры'})
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10,) {
    const total = await this.favoritesService.count();
    const items = await this.favoritesService.findPaginated(Number(page), Number(limit));

    const route = '/api/favorites';
    const linkHeader = createPaginationLinks({page: Number(page), limit: Number(limit), total, route,});

    return {
      headers: {Link: linkHeader},
      data: {total, page: Number(page), limit: Number(limit), items},
    };
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOperation({summary: 'добавить товар в избранное'})
  @ApiBody({type: CreateFavoriteDto})
  @ApiResponse({status: 201, description: 'добавлено в избранное'})
  @ApiResponse({status: 400, description: 'некорректные данные'})
  create(@Body() dto: CreateFavoriteDto) {
    return this.favoritesService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'удалить товар из избранного'})
  @ApiParam({name: 'id', description: 'ID товара в избранном', type: Number})
  @ApiResponse({status: 200, description: 'товар удален'})
  @ApiResponse({status: 404, description: 'товар не найден'})
  @ApiResponse({status: 500, description: 'ошибка на сервере'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.remove(id);
  }
}