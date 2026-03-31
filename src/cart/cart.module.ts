import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma.service';
import { CartApiController } from './cart.api.controller';

@Module({
  controllers: [CartController, CartApiController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
