import { Controller, Get, Render } from '@nestjs/common';
import {ProductsService} from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Render('index')
  async index() {
    const products = await this.productsService.findAll();
    const bags = products.filter(p => p.category === 'bags');
    const shoes = products.filter(p => p.category === 'shoes');
    return { bags, shoes };
  }
}