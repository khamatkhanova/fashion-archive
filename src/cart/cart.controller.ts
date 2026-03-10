import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import type { Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const cartItems = await this.cartService.findAll();
    return res.render('cart/index', {cartItems});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const cartItem = await this.cartService.findOne(+id);
    return res.render('cart/show', {cartItem});
  }

  @Get('add')
  addPage(@Res() res: Response) {
    return res.render('cart/add');
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const cartItem = await this.cartService.create(body);
    return res.redirect(`/cart/${cartItem.id}`);
  }

  @Get(':id/edit')
  async editPage(@Param('id') id: string, @Res() res: Response) {
    const cartItem = await this.cartService.findOne(+id);
    return res.render('cart/edit', {cartItem});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    await this.cartService.update(+id, body);
    return res.redirect(`/cart/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.cartService.remove(+id);
    return res.redirect('/cart');
  }
}