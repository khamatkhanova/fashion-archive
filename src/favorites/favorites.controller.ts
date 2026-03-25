import {Controller, Get, Post, Body, Param, Res} from '@nestjs/common';
import {FavoritesService} from './favorites.service';
import type {Response} from 'express';
import {CreateFavoriteDto} from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async index(@Res() res: Response) {
    const favorites = await this.favoritesService.findAll();
    return res.render('favorites', {favorites});
  }

  @Post()
  async create(@Body() dto: CreateFavoriteDto, @Res() res:Response) {
    await this.favoritesService.create(dto);
    return res.redirect('/favorites');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.favoritesService.remove(+id);
    return res.redirect('/favorites');
  }
}