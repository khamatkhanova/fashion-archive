import {Resolver, Query, Args, Int} from '@nestjs/graphql';
import {ProductsService} from './products.service';
import {ProductObject} from './dto/product.object';

@Resolver(() => ProductObject)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductObject], {name: 'products'})
  getProducts(@Args('page', {type: () => Int, nullable: true}) page = 1, @Args('limit', {type: () => Int, nullable: true}) limit = 10,) {
    return this.productsService.findPaginated(page, limit);
  }

  @Query(() => ProductObject, {name: 'product'})
  getProduct(@Args('id', {type: () => Int}) id: number,) {
    return this.productsService.findById(id);
  }
}