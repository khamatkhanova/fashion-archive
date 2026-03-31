import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {CartService} from './cart.service';
import {CartObject} from './dto/cart.object';
import {CreateCartInput} from './dto/create-cart.input';

@Resolver(() => CartObject)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => [CartObject], {name: 'cartItems'})
  getCart(
    @Args('page', {type: () => Int,nullable: true}) page = 1,
    @Args('limit', {type: () => Int,nullable: true}) limit = 10,
  ) {
    return this.cartService.findPaginated(page, limit);
  }

  @Mutation(() => CartObject)
  addToCart(@Args('data') data: CreateCartInput) {
    return this.cartService.create({...data, quantity: data.quantity ?? 1,});
  }

  @Mutation(() => CartObject)
  removeFromCart(@Args('id', { type: () => Int }) id: number,) {
    return this.cartService.remove(id);
  }
}