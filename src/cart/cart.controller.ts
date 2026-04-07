import { Controller, Get, Post, Body, Param, Res, Render } from '@nestjs/common';
import {CartService} from './cart.service';
import type {Response} from 'express';
import {CreateCartDto} from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Render('cart/index')
  async index() {
    const cartItems = await this.cartService.findAll();
    return {cartItems};
  }

  @Post()
  async create(@Body() dto: CreateCartDto, @Res() res: Response) {
    await this.cartService.create(dto);
    return res.redirect('/cart');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.cartService.remove(+id);
    return res.redirect('/cart');
  }
}