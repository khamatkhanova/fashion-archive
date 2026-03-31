import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => Int, {description: 'ID пользователя'})
  userId: number;

  @Field({description: 'текст задачи'})
  text: string;

  @Field(() => Boolean, {nullable: true, description: 'статус выполнения задачи'})
  completed?: boolean;
}