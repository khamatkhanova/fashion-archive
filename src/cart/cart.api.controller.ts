import {Controller, Get, Post, Body, Param, Delete, UsePipes,ValidationPipe,ParseIntPipe,Query,} from '@nestjs/common';
import {CartService} from './cart.service';
import {CreateCartDto} from './dto/create-cart.dto';
import { createPaginationLinks } from '../pagination';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('api/cart')
export class CartApiController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'получить список товаров в корзине'})
  @ApiQuery({name: 'page', required: false, type: Number, example: 1})
  @ApiQuery({name: 'limit', required: false, type: Number, example: 10})
  @ApiResponse({status: 200, description: 'список корзины'})
  @ApiResponse({status: 400, description: 'некорректные параметры'})
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10,) {
    const total = await this.cartService.count();
    const items = await this.cartService.findPaginated(Number(page), Number(limit));

    const route = '/api/cart';
    const linkHeader = createPaginationLinks({page: Number(page), limit: Number(limit), total, route,});

    return {
      headers: {Link: linkHeader},
      data: {total, page: Number(page), limit: Number(limit), items}, };
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiOperation({summary: 'добавить товар в корзину'})
  @ApiBody({type: CreateCartDto })
  @ApiResponse({status: 201, description: 'добавлено в корзину'})
  @ApiResponse({status: 400, description: 'некорректные данные'})
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'удалить товар из корзины'})
  @ApiParam({name: 'id', description: 'ID товара в корзине', type: Number})
  @ApiResponse({status: 200, description: 'товар удалён'})
  @ApiResponse({status: 404, description: 'товар не найден'})
  @ApiResponse({status: 500, description: 'ошибка на сервере'})
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }
}