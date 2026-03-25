import {Controller, Get, Post, Body, Param, Res} from '@nestjs/common';
import {CartService} from './cart.service';
import type {Response} from 'express';
import {CreateCartDto} from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async index(@Res() res: Response) {
    const cartItems = await this.cartService.findAll();
    return res.render('cart/index', {cartItems});
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