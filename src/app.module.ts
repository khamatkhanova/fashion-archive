import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [ProductsModule, FavoritesModule, CartModule, TodosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}