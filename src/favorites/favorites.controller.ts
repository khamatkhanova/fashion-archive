import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import type { Response } from 'express';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const favorites = await this.favoritesService.findAll();
    return res.render('favorites/index', {favorites});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const favorite = await this.favoritesService.findOne(+id);
    return res.render('favorites/show',{favorite});
  }

  @Post()
  async create(@Body() body: CreateFavoriteDto, @Res() res: Response) {
    const favorite = await this.favoritesService.create(body);
    return res.redirect(`/favorites/${favorite.id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.favoritesService.remove(+id);
    return res.redirect('/favorites');
  }
}