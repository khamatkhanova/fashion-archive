import {ObjectType, Field, Int} from '@nestjs/graphql';
import {ProductObject} from '../../products/dto/product.object';

@ObjectType()
export class FavoriteObject {
  @Field(() => Int, {description: 'ID записи избранного'})
  id: number;

  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field(() => Int, {description: 'ID продукта'})
  productId: number;

  @Field(() => ProductObject, {description: 'продукт, добавленный в избранное'})
  product: ProductObject;
}