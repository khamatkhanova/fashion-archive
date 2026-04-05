import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class CreateFavoriteInput {
  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field(() => Int, {description: 'ID продукта'})
  productId: number;
}