import {Controller, Get, Query, Res, Render} from '@nestjs/common';
import {ProductsService} from './products/products.service';
import type {Response} from 'express';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService) {}

  private session(auth?: string) {
    const isAuth = auth === '1';
    return {isAuth,user: isAuth ? {id: 1, name: 'Алина'} : null,};
  }

  @Get()
  async index(@Query('auth') auth: string, @Res() res: Response) {
    const products = await this.productsService.findAll();
    const bags = products.filter(p=>p.category==='bags');
    const shoes = products.filter(p=>p.category==='shoes');
    return res.render('index', {...this.session(auth),bags,shoes,});
  }

  @Get('auth')
  @Render('auth')
  auth(@Query('auth') auth?: string) {
    return this.session(auth);
  }
}