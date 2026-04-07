import {Body, Controller, Get, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,} from '@nestjs/common';
import {ProductsService} from './products.service';
import {createPaginationLinks} from '../pagination';
import {ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ETagInterceptor} from '../etag';
import {FileInterceptor} from '@nestjs/platform-express';
import {CreateProductDto} from './dto/create-product.dto';

@ApiTags('Products')
@UseInterceptors(ETagInterceptor)
@Controller('api/products')
export class ProductsApiController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  @ApiOperation({ summary: 'получить список продуктов' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'список продуктов' })
  @ApiResponse({ status: 400, description: 'некорректные параметры' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const total = await this.productsService.count();
    const items = await this.productsService.findPaginated(Number(page), Number(limit));

    const route = '/api/products';
    const linkHeader = createPaginationLinks({ page: Number(page), limit: Number(limit), total, route });

    return {
      headers: { Link: linkHeader },
      data: { total, page: Number(page), limit: Number(limit), items },
    };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {name: {type: 'string'}, category: {type: 'string'}, file: {type: 'string', format: 'binary'},},required: ['name', 'category'],},})
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({fileType: 'image'}).addMaxSizeValidator({maxSize: 2 * 1024 * 1024}).build(),) file?: Express.Multer.File,) {
    return this.productsService.create(dto, file);
  }
}