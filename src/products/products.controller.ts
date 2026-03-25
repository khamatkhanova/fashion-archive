import {Controller, Get, Res} from '@nestjs/common';
import {ProductsService} from './products.service';
import type {Response} from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async index(@Res() res: Response) {
    const products = await this.productsService.findAll();
    const bags = products.filter(p=>p.category==='bags');
    const shoes = products.filter(p=>p.category==='shoes');
    return res.render('index',{bags,shoes});
  }
}