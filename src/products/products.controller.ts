import {Controller,Get,Post,Body,Patch,Param,Delete,Res} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    return res.render('products/index', {products});
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.render('products/show', {product});
  }

  @Get('add')
  addPage(@Res() res: Response) {
    return res.render('products/add');
  }

  @Post()
  async create(@Body() body: any,@Res() res: Response) {
    const product = await this.productsService.create(body);
    return res.redirect(`/products/${product.id}`);
  }

  @Get(':id/edit')
  async editPage(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.render('products/edit', { product});
  }

  @Patch(':id')
  async update(@Param('id') id: string,@Body() body: any,@Res() res: Response) {
    await this.productsService.update(+id, body);
    return res.redirect(`/products/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id:string, @Res() res: Response) {
    await this.productsService.remove(+id);
    return res.redirect('/products');
  }
}