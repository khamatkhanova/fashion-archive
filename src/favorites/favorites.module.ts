import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from '../prisma.service';
import { FavoritesApiController } from './favorites.api.controller';
import { ProductsModule } from '../products/products.module';
import { FavoritesResolver } from './favorite.resolver';

@Module({
  imports: [ProductsModule],
  controllers: [FavoritesController, FavoritesApiController],
  providers: [FavoritesService, PrismaService, FavoritesResolver],
})
export class FavoritesModule {}
