import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from '../prisma.service';
import { FavoritesApiController } from './favorites.api.controller';

@Module({
  controllers: [FavoritesController, FavoritesApiController],
  providers: [FavoritesService, PrismaService],
})
export class FavoritesModule {}
