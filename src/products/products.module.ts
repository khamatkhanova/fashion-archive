import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { ProductsApiController } from './products.api.controller';
import { ProductsResolver } from './product.resolver';
import { CacheModule } from '@nestjs/cache-manager';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    CacheModule.register({ttl: 5, max: 100,}), StorageModule],
  controllers: [ProductsController, ProductsApiController],
  providers: [ProductsService, PrismaService, ProductsResolver],
  exports: [ProductsService],
})
export class ProductsModule {}
