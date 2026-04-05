import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field(() => Int, {description: 'ID продукта'})
  productId: number;

  @Field(() => Int, {nullable: true, description: 'Количество товара',})
  quantity?: number;
}