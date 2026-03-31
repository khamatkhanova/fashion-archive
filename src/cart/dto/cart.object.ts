import {ObjectType, Field, Int} from '@nestjs/graphql';
import { ProductObject } from '../../products/dto/product.object';

@ObjectType()
export class CartObject {
  @Field(() => Int, {description: 'ID элемента корзины'})
  id: number;

  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field(() => Int, {description: 'ID продукта'})
  productId: number;

  @Field(() => Int, {description: 'количество товара'})
  quantity: number;

  @Field(() => ProductObject, {description: 'продукт, добавленный в корзину'})
  product: ProductObject;
}