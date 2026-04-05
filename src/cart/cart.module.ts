import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma.service';
import { CartApiController } from './cart.api.controller';
import { CartResolver } from './cart.resolver';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CartController, CartApiController],
  providers: [CartService, PrismaService, CartResolver],
})
export class CartModule {}
