import {ObjectType, Field, Int} from '@nestjs/graphql';

@ObjectType()
export class ProductObject {
  @Field(() => Int, { description: 'ID продукта' })
  id: number;

  @Field({description: 'название продукта'})
  name: string;

  @Field({description: 'категория продукта'})
  category: string;

  @Field({nullable: true, description: 'URL изображения'})
  imageUrl?: string;

  @Field({description: 'дата создания' })
  createdAt: Date;
}