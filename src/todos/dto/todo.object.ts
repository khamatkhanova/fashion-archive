import {ObjectType, Field, Int} from '@nestjs/graphql';

@ObjectType()
export class TodoObject {
  @Field(() => Int, {description: 'ID задачи'})
  id: number;

  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field({description: 'текст задачи'})
  text: string;

  @Field(() => Boolean, {description: 'статус выполнения задачи'})
  completed: boolean;

  @Field({description: 'дата создания задачи'})
  createdAt: Date;
}