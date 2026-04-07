import { Injectable, NotFoundException, Inject, InternalServerErrorException } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { StorageService } from '../storage/storage.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache, private storageService: StorageService,) {}

  findAll() {
    return this.prisma.product.findMany();
  }
  async findById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`product with id ${id} not found`);
    return product;
  }

  count() {
    return this.prisma.product.count();
  }

  async findPaginated(page: number, limit: number) {
    const cacheKey = `products_page_${page}_limit_${limit}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;
    const skip = (page-1)*limit;
    const items = await this.prisma.product.findMany({skip, take: limit});
    await this.cacheManager.set(cacheKey, items);
    return items;
  }

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    try {let imageUrl = dto.imageUrl;
      if (file) {imageUrl = await this.storageService.uploadFile(file);}

      return this.prisma.product.create({data: {name: dto.name, category: dto.category,imageUrl,},});
    } catch {
      throw new InternalServerErrorException('failed to create product');
    }
  }
}