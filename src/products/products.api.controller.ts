import {Controller, Get, Query} from '@nestjs/common';
import {ProductsService} from './products.service';
import {createPaginationLinks} from '../pagination';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('api/products')
export class ProductsApiController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'получить список продуктов'})
  @ApiQuery({name: 'page', required: false, example: 1})
  @ApiQuery({name: 'limit', required: false, example: 10})
  @ApiResponse({status: 200, description: 'список продуктов'})
  @ApiResponse({status: 400, description: 'некорректные параметры'})
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const total = await this.productsService.count();
    const items = await this.productsService.findPaginated(Number(page), Number(limit));

    const route = '/api/products';
    const linkHeader = createPaginationLinks({page: Number(page), limit: Number(limit), total, route});

    return {
      headers: {Link: linkHeader},
      data: {total, page: Number(page), limit: Number(limit), items},
    };
  }
}